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

    const orders = await db.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
            productVariant: true,
          },
        },
        address: true,
        payment: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
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
    const {
      items,
      addressId,
      shipping,
      notes,
      paymentMethod,
      paymentDetails,
    } = body;

    // Get user's cart
    const cart = await db.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true,
            productVariant: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) => {
      const price = item.productVariant?.price || item.product.price;
      return sum + (price * item.quantity);
    }, 0);

    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + (shipping || 0) + tax;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create order
    const order = await db.order.create({
      data: {
        userId: session.user.id,
        orderNumber,
        subtotal,
        shipping: shipping || 0,
        tax,
        total,
        notes,
        addressId,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            productVariantId: item.productVariantId,
            quantity: item.quantity,
            price: item.productVariant?.price || item.product.price,
          })),
        },
        payment: paymentMethod ? {
          create: {
            method: paymentMethod,
            amount: total,
            ...(paymentMethod === "BANK_TRANSFER" && {
              bankName: paymentDetails.bankName,
              accountNumber: paymentDetails.accountNumber,
              receiptImage: paymentDetails.receiptImage,
            }),
          },
        } : undefined,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
            productVariant: true,
          },
        },
        address: true,
        payment: true,
      },
    });

    // Clear cart
    await db.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    // Update product stock
    for (const item of cart.items) {
      if (item.productVariantId) {
        await db.productVariant.update({
          where: { id: item.productVariantId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}