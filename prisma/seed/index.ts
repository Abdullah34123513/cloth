import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create or update categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "mens-clothing" },
      update: {},
      create: {
        name: "Men's Clothing",
        slug: "mens-clothing",
        description: "Stylish clothing for men",
        image: "/images/categories/mens.jpg",
      },
    }),
    prisma.category.upsert({
      where: { slug: "womens-clothing" },
      update: {},
      create: {
        name: "Women's Clothing",
        slug: "womens-clothing",
        description: "Fashionable clothing for women",
        image: "/images/categories/womens.jpg",
      },
    }),
    prisma.category.upsert({
      where: { slug: "accessories" },
      update: {},
      create: {
        name: "Accessories",
        slug: "accessories",
        description: "Fashion accessories and jewelry",
        image: "/images/categories/accessories.jpg",
      },
    }),
    prisma.category.upsert({
      where: { slug: "shoes" },
      update: {},
      create: {
        name: "Shoes",
        slug: "shoes",
        description: "Footwear for all occasions",
        image: "/images/categories/shoes.jpg",
      },
    }),
  ]);

  console.log("✅ Categories created");

  // Create or update users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: "customer@example.com" },
      update: {},
      create: {
        name: "Ahmed Mohammed",
        email: "customer@example.com",
        phone: "+1234567890",
        role: "CUSTOMER",
      },
    }),
    prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        name: "Admin User",
        email: "admin@example.com",
        phone: "+1234567891",
        role: "ADMIN",
      },
    }),
  ]);

  console.log("✅ Users created");

  // Create or update products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { sku: "TSHIRT-001" },
      update: {},
      create: {
        name: "Classic White T-Shirt",
        slug: "classic-white-t-shirt",
        description: "A comfortable and stylish white t-shirt made from 100% cotton.",
        price: 29.99,
        sku: "TSHIRT-001",
        categoryId: categories[0].id,
        isFeatured: true,
        variants: {
          create: [
            { size: "S", color: "White", stock: 50, sku: "TSHIRT-001-S-WHITE" },
            { size: "M", color: "White", stock: 50, sku: "TSHIRT-001-M-WHITE" },
            { size: "L", color: "White", stock: 50, sku: "TSHIRT-001-L-WHITE" },
            { size: "XL", color: "White", stock: 30, sku: "TSHIRT-001-XL-WHITE" },
          ],
        },
        images: {
          create: [
            { url: "/images/products/tshirt-white-1.jpg", alt: "White T-Shirt Front", position: 0 },
            { url: "/images/products/tshirt-white-2.jpg", alt: "White T-Shirt Back", position: 1 },
          ],
        },
      },
    }),
    prisma.product.upsert({
      where: { sku: "JEANS-001" },
      update: {},
      create: {
        name: "Denim Jeans",
        slug: "denim-jeans",
        description: "Classic blue denim jeans with a comfortable fit.",
        price: 79.99,
        salePrice: 69.99,
        sku: "JEANS-001",
        categoryId: categories[0].id,
        isFeatured: true,
        variants: {
          create: [
            { size: "32", color: "Blue", stock: 40, sku: "JEANS-001-32-BLUE" },
            { size: "34", color: "Blue", stock: 40, sku: "JEANS-001-34-BLUE" },
            { size: "36", color: "Blue", stock: 30, sku: "JEANS-001-36-BLUE" },
            { size: "38", color: "Blue", stock: 20, sku: "JEANS-001-38-BLUE" },
          ],
        },
        images: {
          create: [
            { url: "/images/products/jeans-blue-1.jpg", alt: "Blue Denim Jeans Front", position: 0 },
            { url: "/images/products/jeans-blue-2.jpg", alt: "Blue Denim Jeans Back", position: 1 },
          ],
        },
      },
    }),
    prisma.product.upsert({
      where: { sku: "DRESS-001" },
      update: {},
      create: {
        name: "Summer Dress",
        slug: "summer-dress",
        description: "A beautiful summer dress perfect for warm weather.",
        price: 89.99,
        sku: "DRESS-001",
        categoryId: categories[1].id,
        isFeatured: true,
        variants: {
          create: [
            { size: "S", color: "Floral", stock: 25, sku: "DRESS-001-S-FLORAL" },
            { size: "M", color: "Floral", stock: 25, sku: "DRESS-001-M-FLORAL" },
            { size: "L", color: "Floral", stock: 20, sku: "DRESS-001-L-FLORAL" },
          ],
        },
        images: {
          create: [
            { url: "/images/products/dress-floral-1.jpg", alt: "Floral Summer Dress Front", position: 0 },
            { url: "/images/products/dress-floral-2.jpg", alt: "Floral Summer Dress Back", position: 1 },
          ],
        },
      },
    }),
    prisma.product.upsert({
      where: { sku: "BAG-001" },
      update: {},
      create: {
        name: "Leather Handbag",
        slug: "leather-handbag",
        description: "Genuine leather handbag with multiple compartments.",
        price: 149.99,
        sku: "BAG-001",
        categoryId: categories[2].id,
        isFeatured: true,
        variants: {
          create: [
            { color: "Black", stock: 15, sku: "BAG-001-BLACK" },
            { color: "Brown", stock: 15, sku: "BAG-001-BROWN" },
          ],
        },
        images: {
          create: [
            { url: "/images/products/bag-leather-1.jpg", alt: "Leather Handbag Front", position: 0 },
            { url: "/images/products/bag-leather-2.jpg", alt: "Leather Handbag Inside", position: 1 },
          ],
        },
      },
    }),
    prisma.product.upsert({
      where: { sku: "SHOES-001" },
      update: {},
      create: {
        name: "Running Shoes",
        slug: "running-shoes",
        description: "Comfortable running shoes with excellent cushioning.",
        price: 119.99,
        sku: "SHOES-001",
        categoryId: categories[3].id,
        isFeatured: true,
        variants: {
          create: [
            { size: "8", color: "Black", stock: 30, sku: "SHOES-001-8-BLACK" },
            { size: "9", color: "Black", stock: 30, sku: "SHOES-001-9-BLACK" },
            { size: "10", color: "Black", stock: 25, sku: "SHOES-001-10-BLACK" },
            { size: "11", color: "Black", stock: 20, sku: "SHOES-001-11-BLACK" },
          ],
        },
        images: {
          create: [
            { url: "/images/products/shoes-running-1.jpg", alt: "Running Shoes Side", position: 0 },
            { url: "/images/products/shoes-running-2.jpg", alt: "Running Shoes Top", position: 1 },
          ],
        },
      },
    }),
    prisma.product.upsert({
      where: { sku: "SHIRT-001" },
      update: {},
      create: {
        name: "Casual Shirt",
        slug: "casual-shirt",
        description: "A comfortable casual shirt perfect for everyday wear.",
        price: 49.99,
        sku: "SHIRT-001",
        categoryId: categories[0].id,
        variants: {
          create: [
            { size: "S", color: "Blue", stock: 20, sku: "SHIRT-001-S-BLUE" },
            { size: "M", color: "Blue", stock: 20, sku: "SHIRT-001-M-BLUE" },
            { size: "L", color: "Blue", stock: 15, sku: "SHIRT-001-L-BLUE" },
          ],
        },
        images: {
          create: [
            { url: "/images/products/shirt-casual-1.jpg", alt: "Casual Shirt Front", position: 0 },
          ],
        },
      },
    }),
  ]);

  console.log("✅ Products created");

  // Create carts for users if they don't exist
  await Promise.all([
    prisma.cart.upsert({
      where: { userId: users[0].id },
      update: {},
      create: {
        userId: users[0].id,
      },
    }),
    prisma.cart.upsert({
      where: { userId: users[1].id },
      update: {},
      create: {
        userId: users[1].id,
      },
    }),
  ]);

  console.log("✅ Carts created");

  // Create sample addresses if they don't exist
  const existingAddress = await prisma.address.findFirst({
    where: {
      userId: users[0].id,
      type: "SHIPPING"
    }
  });

  if (!existingAddress) {
    await prisma.address.create({
      data: {
        userId: users[0].id,
        type: "SHIPPING",
        firstName: "Ahmed",
        lastName: "Mohammed",
        phone: "+1234567890",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        country: "United States",
        zipCode: "10001",
        isDefault: true,
      },
    });
  }

  console.log("✅ Addresses created");

  // Create sample reviews if they don't exist
  await Promise.all([
    prisma.review.upsert({
      where: {
        userId_productId: {
          userId: users[0].id,
          productId: products[0].id
        }
      },
      update: {},
      create: {
        userId: users[0].id,
        productId: products[0].id,
        rating: 5,
        comment: "Great quality t-shirt! Very comfortable.",
      },
    }),
    prisma.review.upsert({
      where: {
        userId_productId: {
          userId: users[0].id,
          productId: products[1].id
        }
      },
      update: {},
      create: {
        userId: users[0].id,
        productId: products[1].id,
        rating: 4,
        comment: "Good fit, nice denim quality.",
      },
    }),
  ]);

  console.log("✅ Reviews created");

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });