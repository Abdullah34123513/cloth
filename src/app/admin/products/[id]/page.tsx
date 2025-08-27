"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2, Loader2 } from "lucide-react";

interface Variant {
  id?: string;
  size: string;
  color: string;
  stock: number;
  sku: string;
  price?: number;
}

interface Image {
  id?: string;
  url: string;
  alt: string;
  position: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  sku: string;
  categoryId: string;
  isFeatured: boolean;
  isActive: boolean;
  variants: Variant[];
  images: Image[];
}

export default function EditProductPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    salePrice: "",
    sku: "",
    categoryId: "",
    isFeatured: false,
    isActive: true,
  });

  useEffect(() => {
    if (!session || session.user?.role !== "ADMIN") {
      router.push("/login");
      return;
    }

    if (params.id) {
      fetchProduct();
      fetchCategories();
    }
  }, [session, router, params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
        setFormData({
          name: data.name,
          description: data.description || "",
          price: data.price.toString(),
          salePrice: data.salePrice?.toString() || "",
          sku: data.sku,
          categoryId: data.categoryId,
          isFeatured: data.isFeatured,
          isActive: data.isActive,
        });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : undefined,
      };

      const response = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/admin?tab=products");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${params.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/admin?tab=products");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  if (!session || session.user?.role !== "ADMIN") {
    return <div>Loading...</div>;
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => router.push("/admin?tab=products")}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="outline" onClick={() => router.push("/admin?tab=products")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        <h1 className="text-3xl font-bold mb-2">Edit Product</h1>
        <p className="text-muted-foreground">Update product information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="salePrice">Sale Price</Label>
                <Input
                  id="salePrice"
                  type="number"
                  step="0.01"
                  value={formData.salePrice}
                  onChange={(e) => handleInputChange("salePrice", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.categoryId} onValueChange={(value) => handleInputChange("categoryId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => handleInputChange("isFeatured", e.target.checked)}
                />
                <span>Featured Product</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleInputChange("isActive", e.target.checked)}
                />
                <span>Active</span>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Current Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Current Variants ({product.variants.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {product.variants.map((variant, index) => (
                <div key={variant.id || index} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <span className="font-medium">{variant.size}</span>
                    {variant.color && <span className="text-muted-foreground ml-2">- {variant.color}</span>}
                  </div>
                  <div className="text-right">
                    <div>Stock: {variant.stock}</div>
                    <div className="text-sm text-muted-foreground">SKU: {variant.sku}</div>
                  </div>
                </div>
              ))}
              {product.variants.length === 0 && (
                <p className="text-muted-foreground text-center py-4">No variants found</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Current Images */}
        <Card>
          <CardHeader>
            <CardTitle>Current Images ({product.images.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div key={image.id || index} className="border rounded p-2">
                  <div className="aspect-square bg-muted rounded mb-2 flex items-center justify-center">
                    {image.url ? (
                      <img 
                        src={image.url} 
                        alt={image.alt} 
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = "/api/placeholder/200/200";
                        }}
                      />
                    ) : (
                      <div className="text-muted-foreground">No image</div>
                    )}
                  </div>
                  <p className="text-sm truncate">{image.alt || "No alt text"}</p>
                </div>
              ))}
              {product.images.length === 0 && (
                <p className="text-muted-foreground col-span-full text-center py-4">No images found</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleDelete}
          >
            Delete Product
          </Button>
          <div className="space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push("/admin?tab=products")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Update Product"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}