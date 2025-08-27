"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, ShoppingCart, Share2, Truck, Shield, RotateCcw } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Mock product data
  const product = {
    id: params.id,
    name: "Premium Thobe",
    description: "Experience the perfect blend of tradition and modernity with our Premium Thobe. Crafted from high-quality fabric, this thobe offers exceptional comfort and style for any occasion. The classic design features intricate embroidery and a tailored fit that enhances your appearance while maintaining cultural authenticity.",
    price: 299,
    salePrice: 249,
    sku: "THB-001",
    category: "Men's Collection",
    brand: "KSA Fashion",
    rating: 4.5,
    reviewCount: 128,
    isNew: true,
    isFeatured: true,
    inStock: true,
    images: [
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
      "/api/placeholder/600/800",
    ],
    variants: [
      { id: "1", size: "S", color: "Black", stock: 15, price: 299 },
      { id: "2", size: "M", color: "Black", stock: 23, price: 299 },
      { id: "3", size: "L", color: "Black", stock: 18, price: 299 },
      { id: "4", size: "XL", color: "Black", stock: 12, price: 299 },
      { id: "5", size: "S", color: "White", stock: 20, price: 299 },
      { id: "6", size: "M", color: "White", stock: 25, price: 299 },
      { id: "7", size: "L", color: "White", stock: 19, price: 299 },
      { id: "8", size: "XL", color: "White", stock: 14, price: 299 },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    features: [
      "Premium quality fabric",
      "Traditional embroidery",
      "Comfortable fit",
      "Easy to maintain",
      "Available in multiple sizes and colors"
    ],
    specifications: {
      material: "100% Premium Cotton",
      care: "Machine wash cold, tumble dry low",
      origin: "Made in Saudi Arabia",
      fit: "Regular fit",
      sleeve: "Long sleeve"
    }
  };

  // Mock reviews
  const reviews = [
    {
      id: "1",
      user: "Ahmed Mohammed",
      rating: 5,
      comment: "Excellent quality thobe! The fabric is very comfortable and the embroidery is beautiful. Highly recommended.",
      date: "2024-01-15"
    },
    {
      id: "2",
      user: "Khalid Al-Saud",
      rating: 4,
      comment: "Good quality overall, fits well. The only minor issue is that it's slightly thinner than expected, but still great value for money.",
      date: "2024-01-10"
    },
    {
      id: "3",
      user: "Yousef Abdullah",
      rating: 5,
      comment: "Perfect for special occasions. The attention to detail is impressive and the customer service was excellent.",
      date: "2024-01-05"
    }
  ];

  // Mock related products
  const relatedProducts = [
    {
      id: "2",
      name: "Elegant Abaya",
      price: 399,
      image: "/api/placeholder/300/400",
      rating: 4.8
    },
    {
      id: "3",
      name: "Modern Kandura",
      price: 349,
      salePrice: 299,
      image: "/api/placeholder/300/400",
      rating: 4.3
    },
    {
      id: "4",
      name: "Designer Hijab",
      price: 149,
      image: "/api/placeholder/300/400",
      rating: 4.7
    }
  ];

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size and color");
      return;
    }
    
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const getAvailableStock = () => {
    const variant = product.variants.find(v => v.size === selectedSize && v.color === selectedColor);
    return variant ? variant.stock : 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <Badge variant="secondary">New</Badge>
              )}
              {product.salePrice && (
                <Badge variant="destructive">Sale</Badge>
              )}
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{product.category}</Badge>
              {product.isNew && <Badge variant="secondary">New</Badge>}
              {product.isFeatured && <Badge variant="default">Featured</Badge>}
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 text-gray-300" />
              </div>
              <span className="text-lg font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">
                {product.salePrice ? `SAR ${product.salePrice}` : `SAR ${product.price}`}
              </span>
              {product.salePrice && (
                <span className="text-xl text-muted-foreground line-through">
                  SAR {product.price}
                </span>
              )}
            </div>
            {product.salePrice && (
              <Badge variant="destructive">
                Save {Math.round(((product.price - product.salePrice) / product.price) * 100)}%
              </Badge>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Variant Selection */}
          <div className="space-y-4">
            {/* Color Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Color</label>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-md border-2 transition-colors ${
                      selectedColor === color
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Size</label>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-md border-2 flex items-center justify-center transition-colors ${
                      selectedSize === size
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium mb-2 block">Quantity</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(prev => prev + 1)}
                  disabled={getAvailableStock() <= quantity}
                >
                  +
                </Button>
                <span className="text-sm text-muted-foreground ml-2">
                  {getAvailableStock()} available
                </span>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="space-y-2">
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor || !product.inStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isAddedToCart ? "Added to Cart!" : "Add to Cart"}
            </Button>
            {!product.inStock && (
              <p className="text-center text-red-500">Out of stock</p>
            )}
          </div>

          {/* Product Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Quality Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span className="text-sm">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="mb-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>Our Premium Thobe is designed for the modern gentleman who values both tradition and contemporary style. Each piece is carefully crafted with attention to detail, ensuring you look your best for any occasion, from daily wear to special events.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b">
                  <span className="font-medium capitalize">{key}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Review Summary */}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold">{product.rating}</div>
                  <div className="flex items-center justify-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 text-gray-300" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {product.reviewCount} reviews
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {reviews.map(review => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{review.user}</div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-2">{review.comment}</p>
                      <div className="text-sm text-muted-foreground">{review.date}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map(product => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
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
                      SAR {product.salePrice || product.price}
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
      </div>
    </div>
  );
}