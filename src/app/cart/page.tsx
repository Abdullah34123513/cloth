"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  Truck,
  Shield,
  RotateCcw
} from "lucide-react";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  stock: number;
  variantId: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  // Mock cart data
  const mockCartItems: CartItem[] = [
    {
      id: "1",
      productId: "1",
      name: "Premium Thobe",
      price: 299,
      salePrice: 249,
      image: "/api/placeholder/100/120",
      size: "L",
      color: "Black",
      quantity: 1,
      stock: 15,
      variantId: "3"
    },
    {
      id: "2",
      productId: "2",
      name: "Elegant Abaya",
      price: 399,
      image: "/api/placeholder/100/120",
      size: "M",
      color: "Black",
      quantity: 2,
      stock: 8,
      variantId: "2"
    },
    {
      id: "3",
      productId: "4",
      name: "Designer Hijab",
      price: 149,
      image: "/api/placeholder/100/120",
      size: "One Size",
      color: "Blue",
      quantity: 1,
      stock: 25,
      variantId: "4"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCartItems(mockCartItems);
      setLoading(false);
    }, 1000);
  }, []);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.min(newQuantity, item.stock) }
          : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "WELCOME10") {
      setDiscount(0.1); // 10% discount
      setPromoError("");
    } else if (promoCode.toUpperCase() === "SAVE20") {
      setDiscount(0.2); // 20% discount
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setDiscount(0);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.salePrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 200 ? 0 : 25; // Free shipping over SAR 200
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.15; // 15% VAT
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * discount;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax() - calculateDiscount();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex gap-4 p-4 border rounded-lg">
                <div className="w-24 h-28 bg-muted rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-6 bg-muted rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link href="/shop">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-28 object-cover rounded-md"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Size: {item.size}</span>
                          <span>•</span>
                          <span>Color: {item.color}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 text-center"
                          min="1"
                          max={item.stock}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {item.stock} available
                        </span>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">
                            SAR {((item.salePrice || item.price) * item.quantity).toFixed(2)}
                          </span>
                          {item.salePrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              SAR {(item.price * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          SAR {(item.salePrice || item.price).toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Continue Shopping */}
          <Button variant="outline" asChild>
            <Link href="/shop">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>SAR {calculateSubtotal().toFixed(2)}</span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {calculateShipping() === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `SAR ${calculateShipping().toFixed(2)}`
                  )}
                </span>
              </div>

              {/* Tax */}
              <div className="flex justify-between">
                <span>Tax (15%)</span>
                <span>SAR {calculateTax().toFixed(2)}</span>
              </div>

              {/* Discount */}
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({Math.round(discount * 100)}%)</span>
                  <span>-SAR {calculateDiscount().toFixed(2)}</span>
                </div>
              )}

              <Separator />

              {/* Total */}
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>SAR {calculateTotal().toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={applyPromoCode}>
                    Apply
                  </Button>
                </div>
                {promoError && (
                  <p className="text-sm text-red-500">{promoError}</p>
                )}
                {discount > 0 && (
                  <p className="text-sm text-green-600">
                    Promo code applied successfully!
                  </p>
                )}
              </div>

              {/* Free Shipping Notice */}
              {calculateSubtotal() < 200 && (
                <div className="bg-blue-50 p-3 rounded-md text-sm">
                  <div className="flex items-center gap-2 text-blue-800">
                    <Truck className="h-4 w-4" />
                    <span>
                      Add SAR {(200 - calculateSubtotal()).toFixed(2)} more for free shipping!
                    </span>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <Button size="lg" className="w-full" asChild>
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>

              {/* Security Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto text-green-600 mb-1" />
                  <span className="text-xs">Secure Payment</span>
                </div>
                <div className="text-center">
                  <Truck className="h-8 w-8 mx-auto text-blue-600 mb-1" />
                  <span className="text-xs">Fast Delivery</span>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-8 w-8 mx-auto text-orange-600 mb-1" />
                  <span className="text-xs">Easy Returns</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-12 bg-muted/50 rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <Shield className="h-12 w-12 mx-auto text-green-600 mb-4" />
            <h3 className="font-semibold mb-2">Secure Shopping</h3>
            <p className="text-sm text-muted-foreground">
              Your payment information is encrypted and secure
            </p>
          </div>
          <div>
            <Truck className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Quick delivery across Saudi Arabia within 2-3 business days
            </p>
          </div>
          <div>
            <RotateCcw className="h-12 w-12 mx-auto text-orange-600 mb-4" />
            <h3 className="font-semibold mb-2">Easy Returns</h3>
            <p className="text-sm text-muted-foreground">
              30-day return policy for your peace of mind
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}