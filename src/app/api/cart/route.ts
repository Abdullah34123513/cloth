import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get or create cart for user
    let cart = await db.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
                category: true,
              },
            },
            productVariant: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: session.user.id,
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: true,
                  category: true,
                },
              },
              productVariant: true,
            },
          },
        },
      });
    }

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) => {
      const price = item.productVariant?.price || item.product.price;
      return sum + (price * item.quantity);
    }, 0);

    return NextResponse.json({
      ...cart,
      subtotal,
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, productVariantId, quantity } = body;

    // Validate product exists
    const product = await db.product.findUnique({
      where: { id: productId },
      include: {
        variants: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Check stock if variant is specified
    if (productVariantId) {
      const variant = product.variants.find(v => v.id === productVariantId);
      if (!variant || variant.stock < quantity) {
        return NextResponse.json(
          { error: "Insufficient stock" },
          { status: 400 }
        );
      }
    }

    // Get or create cart
    let cart = await db.cart.findUnique({
      where: { userId: session.user.id },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: session.user.id,
        },
      });
    }

    // Check if item already exists in cart
    const existingItem = await db.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        productVariantId,
      },
    });

    if (existingItem) {
      // Update quantity
      await db.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
      });
    } else {
      // Add new item
      await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          productVariantId,
          quantity,
        },
      });
    }

    // Return updated cart
    const updatedCart = await db.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
                category: true,
              },
            },
            productVariant: true,
          },
        },
      },
    });

    const subtotal = updatedCart!.items.reduce((sum, item) => {
      const price = item.productVariant?.price || item.product.price;
      return sum + (price * item.quantity);
    }, 0);

    return NextResponse.json({
      ...updatedCart,
      subtotal,
      itemCount: updatedCart!.items.reduce((sum, item) => sum + item.quantity, 0),
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}