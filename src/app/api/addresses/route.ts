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

    const addresses = await db.address.findMany({
      where: { userId: session.user.id },
      orderBy: [
        { isDefault: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return NextResponse.json(
      { error: "Failed to fetch addresses" },
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
      type,
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      country,
      zipCode,
      isDefault,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !phone || !address || !city || !state || !country || !zipCode) {
      return NextResponse.json(
        { error: "All address fields are required" },
        { status: 400 }
      );
    }

    // If this is set as default, unset other default addresses of the same type
    if (isDefault) {
      await db.address.updateMany({
        where: {
          userId: session.user.id,
          type,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const addressData = await db.address.create({
      data: {
        userId: session.user.id,
        type,
        firstName,
        lastName,
        phone,
        address,
        city,
        state,
        country,
        zipCode,
        isDefault: isDefault || false,
      },
    });

    return NextResponse.json(addressData, { status: 201 });
  } catch (error) {
    console.error("Error creating address:", error);
    return NextResponse.json(
      { error: "Failed to create address" },
      { status: 500 }
    );
  }
}