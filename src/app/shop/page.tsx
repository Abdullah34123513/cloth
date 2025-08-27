"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Mock data
  const categories = [
    { id: "men", name: "Men's Collection" },
    { id: "women", name: "Women's Collection" },
    { id: "traditional", name: "Traditional Wear" },
    { id: "accessories", name: "Accessories" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Blue", "Red", "Green", "Brown", "Gray"];

  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Premium Thobe",
      price: 299,
      salePrice: 249,
      image: "/api/placeholder/300/400",
      category: "men",
      rating: 4.5,
      reviewCount: 128,
      isNew: true,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White", "Blue"],
    },
    {
      id: "2",
      name: "Elegant Abaya",
      price: 399,
      image: "/api/placeholder/300/400",
      category: "women",
      rating: 4.8,
      reviewCount: 89,
      isFeatured: true,
      sizes: ["S", "M", "L"],
      colors: ["Black", "Brown"],
    },
    {
      id: "3",
      name: "Modern Kandura",
      price: 349,
      salePrice: 299,
      image: "/api/placeholder/300/400",
      category: "men",
      rating: 4.3,
      reviewCount: 67,
      sizes: ["M", "L", "XL", "XXL"],
      colors: ["White", "Gray"],
    },
    {
      id: "4",
      name: "Designer Hijab",
      price: 149,
      image: "/api/placeholder/300/400",
      category: "women",
      rating: 4.7,
      reviewCount: 156,
      isNew: true,
      sizes: ["One Size"],
      colors: ["Black", "Blue", "Red", "Green"],
    },
    {
      id: "5",
      name: "Traditional Shemagh",
      price: 89,
      image: "/api/placeholder/300/400",
      category: "accessories",
      rating: 4.6,
      reviewCount: 234,
      sizes: ["One Size"],
      colors: ["Red", "White", "Black"],
    },
    {
      id: "6",
      name: "Luxury Bisht",
      price: 599,
      image: "/api/placeholder/300/400",
      category: "men",
      rating: 4.9,
      reviewCount: 45,
      isFeatured: true,
      sizes: ["M", "L", "XL"],
      colors: ["Black", "Brown"],
    },
    {
      id: "7",
      name: "Modest Dress",
      price: 279,
      salePrice: 229,
      image: "/api/placeholder/300/400",
      category: "women",
      rating: 4.4,
      reviewCount: 78,
      sizes: ["S", "M", "L"],
      colors: ["Blue", "Green", "Gray"],
    },
    {
      id: "8",
      name: "Classic Ghutra",
      price: 79,
      image: "/api/placeholder/300/400",
      category: "accessories",
      rating: 4.5,
      reviewCount: 167,
      sizes: ["One Size"],
      colors: ["White", "Red"],
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product => {
      const price = product.salePrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => selectedColors.includes(color))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchTerm, selectedCategory, priceRange, selectedSizes, selectedColors, sortBy]);

  const handleSizeChange = (size: string, checked: boolean | string) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size]);
    } else {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    }
  };

  const handleColorChange = (color: string, checked: boolean | string) => {
    if (checked) {
      setSelectedColors([...selectedColors, color]);
    } else {
      setSelectedColors(selectedColors.filter(c => c !== color));
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange([0, 1000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy("featured");
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">
                  Price Range: SAR {priceRange[0]} - SAR {priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Sizes</label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <label key={size} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={selectedSizes.includes(size)}
                        onCheckedChange={(checked) => handleSizeChange(size, checked)}
                      />
                      <span className="text-sm">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Colors</label>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <label key={color} className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={selectedColors.includes(color)}
                        onCheckedChange={(checked) => handleColorChange(color, checked)}
                      />
                      <span className="text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Shop</h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} products found
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="aspect-[3/4] bg-muted" />
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-6 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map(product => (
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
                        <h3 className="font-semibold mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm ml-1">{product.rating}</span>
                            <span className="text-sm text-muted-foreground ml-1">
                              ({product.reviewCount})
                            </span>
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
              ) : (
                <div className="space-y-4">
                  {currentProducts.map(product => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="flex">
                        <div className="w-48 flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="flex-1 p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                {product.isNew && (
                                  <Badge variant="secondary">New</Badge>
                                )}
                                {product.salePrice && (
                                  <Badge variant="destructive">Sale</Badge>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold mb-2">
                                {product.name}
                              </h3>
                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm ml-1">{product.rating}</span>
                                  <span className="text-sm text-muted-foreground ml-1">
                                    ({product.reviewCount})
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-lg">
                                    {product.salePrice ? `SAR ${product.salePrice}` : `SAR ${product.price}`}
                                  </span>
                                  {product.salePrice && (
                                    <span className="text-sm text-muted-foreground line-through">
                                      SAR {product.price}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2 mb-4">
                                <span className="text-sm text-muted-foreground">Sizes:</span>
                                {product.sizes.map(size => (
                                  <Badge key={size} variant="outline" className="text-xs">
                                    {size}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="icon" variant="outline">
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
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
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            onClick={() => setCurrentPage(index + 1)}
                            isActive={currentPage === index + 1}
                            className="cursor-pointer"
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}