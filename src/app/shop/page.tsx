"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Star, Heart, ShoppingCart, Filter, Grid, List, Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  sizes: string[];
  colors: string[];
}

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    inStock: true,
    onSale: false,
    featured: false,
    newArrivals: false,
  });

  // Mock categories
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "mens", name: "Men's Clothing" },
    { id: "womens", name: "Women's Clothing" },
    { id: "accessories", name: "Accessories" },
    { id: "traditional", name: "Traditional Wear" },
  ];

  // Mock products data
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Premium Thobe",
      price: 299,
      salePrice: 249,
      image: "/api/placeholder/300/400",
      category: "Men's Clothing",
      rating: 4.5,
      reviewCount: 128,
      isNew: true,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White", "Navy"],
    },
    {
      id: "2",
      name: "Elegant Abaya",
      price: 399,
      image: "/api/placeholder/300/400",
      category: "Women's Clothing",
      rating: 4.8,
      reviewCount: 89,
      isFeatured: true,
      sizes: ["S", "M", "L"],
      colors: ["Black", "Navy", "Burgundy"],
    },
    {
      id: "3",
      name: "Modern Kandura",
      price: 349,
      salePrice: 299,
      image: "/api/placeholder/300/400",
      category: "Men's Clothing",
      rating: 4.3,
      reviewCount: 67,
      sizes: ["M", "L", "XL"],
      colors: ["White", "Cream"],
    },
    {
      id: "4",
      name: "Designer Hijab",
      price: 149,
      image: "/api/placeholder/300/400",
      category: "Women's Clothing",
      rating: 4.7,
      reviewCount: 234,
      isNew: true,
      sizes: ["One Size"],
      colors: ["Black", "Blue", "Pink", "Green"],
    },
    {
      id: "5",
      name: "Traditional Bisht",
      price: 599,
      image: "/api/placeholder/300/400",
      category: "Traditional Wear",
      rating: 4.9,
      reviewCount: 45,
      isFeatured: true,
      sizes: ["M", "L", "XL"],
      colors: ["Black", "Brown"],
    },
    {
      id: "6",
      name: "Leather Belt",
      price: 89,
      salePrice: 69,
      image: "/api/placeholder/300/400",
      category: "Accessories",
      rating: 4.2,
      reviewCount: 156,
      sizes: ["S", "M", "L"],
      colors: ["Black", "Brown"],
    },
    {
      id: "7",
      name: "Casual Shemagh",
      price: 79,
      image: "/api/placeholder/300/400",
      category: "Accessories",
      rating: 4.4,
      reviewCount: 98,
      isNew: true,
      sizes: ["One Size"],
      colors: ["Red", "White", "Black"],
    },
    {
      id: "8",
      name: "Formal Dishdasha",
      price: 449,
      image: "/api/placeholder/300/400",
      category: "Men's Clothing",
      rating: 4.6,
      reviewCount: 73,
      isFeatured: true,
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Navy"],
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase().includes(selectedCategory);
    
    let matchesPrice = true;
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      matchesPrice = product.price >= min && product.price <= max;
    }

    const matchesFilters = (!filters.inStock || product.sizes.length > 0) &&
                          (!filters.onSale || product.salePrice) &&
                          (!filters.featured || product.isFeatured) &&
                          (!filters.newArrivals || product.isNew);

    return matchesSearch && matchesCategory && matchesPrice && matchesFilters;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const itemsPerPage = 12;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="aspect-[3/4] bg-muted rounded-lg" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-6 bg-muted rounded w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shop</h1>
        <p className="text-muted-foreground">
          Discover our collection of premium Saudi fashion
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-50">Under $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-200">$100 - $200</SelectItem>
                    <SelectItem value="200-500">$200 - $500</SelectItem>
                    <SelectItem value="500+">Over $500</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Filters */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Filters</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={filters.inStock}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, inStock: checked as boolean }))
                      }
                    />
                    <Label htmlFor="inStock" className="text-sm">In Stock</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="onSale"
                      checked={filters.onSale}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, onSale: checked as boolean }))
                      }
                    />
                    <Label htmlFor="onSale" className="text-sm">On Sale</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={filters.featured}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, featured: checked as boolean }))
                      }
                    />
                    <Label htmlFor="featured" className="text-sm">Featured</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newArrivals"
                      checked={filters.newArrivals}
                      onCheckedChange={(checked) => 
                        setFilters(prev => ({ ...prev, newArrivals: checked as boolean }))
                      }
                    />
                    <Label htmlFor="newArrivals" className="text-sm">New Arrivals</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Controls Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <p className="text-sm text-muted-foreground">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map(product => (
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
                      {product.isFeatured && (
                        <Badge variant="default">Featured</Badge>
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
                      <span className="text-sm text-muted-foreground">
                        ({product.reviewCount})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">
                          ${product.salePrice || product.price}
                        </span>
                        {product.salePrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.price}
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
          ) : (
            <div className="space-y-4">
              {paginatedProducts.map(product => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-32 h-40 object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">
                              {product.category}
                            </div>
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                          </div>
                          <div className="flex gap-2">
                            {product.isNew && <Badge variant="secondary">New</Badge>}
                            {product.isFeatured && <Badge variant="default">Featured</Badge>}
                            {product.salePrice && <Badge variant="destructive">Sale</Badge>}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm ml-1">{product.rating}</span>
                            <span className="text-sm text-muted-foreground ml-1">
                              ({product.reviewCount} reviews)
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Sizes: {product.sizes.join(", ")}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Colors: {product.colors.join(", ")}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">
                              ${product.salePrice || product.price}
                            </span>
                            {product.salePrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.price}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button size="sm">
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}