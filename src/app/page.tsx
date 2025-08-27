import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, ArrowRight } from "lucide-react";

export default function Home() {
  // Mock data for featured products
  const featuredProducts = [
    {
      id: "1",
      name: "Premium Thobe",
      price: 299,
      salePrice: 249,
      image: "/api/placeholder/300/400",
      category: "Men",
      rating: 4.5,
      isNew: true,
    },
    {
      id: "2",
      name: "Elegant Abaya",
      price: 399,
      image: "/api/placeholder/300/400",
      category: "Women",
      rating: 4.8,
      isFeatured: true,
    },
    {
      id: "3",
      name: "Modern Kandura",
      price: 349,
      salePrice: 299,
      image: "/api/placeholder/300/400",
      category: "Men",
      rating: 4.3,
    },
    {
      id: "4",
      name: "Designer Hijab",
      price: 149,
      image: "/api/placeholder/300/400",
      category: "Women",
      rating: 4.7,
      isNew: true,
    },
  ];

  // Mock data for categories
  const categories = [
    {
      id: "1",
      name: "Men's Collection",
      image: "/api/placeholder/400/300",
      productCount: 156,
    },
    {
      id: "2",
      name: "Women's Collection",
      image: "/api/placeholder/400/300",
      productCount: 234,
    },
    {
      id: "3",
      name: "Traditional Wear",
      image: "/api/placeholder/400/300",
      productCount: 89,
    },
    {
      id: "4",
      name: "Accessories",
      image: "/api/placeholder/400/300",
      productCount: 67,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Premium
              <br />
              <span className="text-primary">Saudi Fashion</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Experience the finest traditional and contemporary clothing 
              crafted with excellence for the modern Saudi lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/categories">
                  Browse Categories
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium clothing items 
              that showcase the best of Saudi fashion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge variant="secondary">New</Badge>
                    )}
                    {product.salePrice && (
                      <Badge variant="destructive">Sale</Badge>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">
                    {product.category}
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">
                        {product.salePrice ? `SAR ${product.salePrice}` : `SAR ${product.price}`}
                      </span>
                      {product.salePrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          SAR {product.price}
                        </span>
                      )}
                    </div>
                    <Button size="sm" variant="outline">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/shop">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse range of categories designed to meet 
              all your fashion needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">
                        {category.productCount} Products
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">
                Free shipping on orders over SAR 200 across Saudi Arabia
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                Premium quality fabrics and craftsmanship in every piece
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">
                Dedicated customer support available around the clock
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Subscribe to our newsletter and get 10% off your first order
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button variant="secondary" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}