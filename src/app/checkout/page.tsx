"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  ArrowRight, 
  Truck, 
  Shield, 
  Clock, 
  CreditCard, 
  Building2,
  Upload,
  CheckCircle
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "Saudi Arabia",
    zipCode: "",
    saveAddress: false
  });

  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [bankTransferInfo, setBankTransferInfo] = useState({
    bankName: "",
    accountNumber: "",
    receiptImage: null,
    notes: ""
  });

  // Mock cart data
  const cartItems = [
    {
      id: "1",
      name: "Premium Thobe",
      price: 299,
      salePrice: 249,
      image: "/api/placeholder/80/100",
      size: "L",
      color: "Black",
      quantity: 1
    },
    {
      id: "2",
      name: "Elegant Abaya",
      price: 399,
      image: "/api/placeholder/80/100",
      size: "M",
      color: "Black",
      quantity: 2
    }
  ];

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.salePrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 200 ? 0 : 25;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.15;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      const orderNum = "KSA-" + Math.random().toString(36).substr(2, 9).toUpperCase();
      setOrderNumber(orderNum);
      setOrderComplete(true);
      setIsProcessing(false);
    }, 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBankTransferInfo(prev => ({
        ...prev,
        receiptImage: file
      }));
    }
  };

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-2">
            Thank you for your order. Your order number is:
          </p>
          <p className="text-2xl font-bold text-primary mb-6">{orderNumber}</p>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Bank Transfer Instructions</h3>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span>Bank Name:</span>
                  <span className="font-medium">Saudi National Bank (SNB)</span>
                </div>
                <div className="flex justify-between">
                  <span>Account Name:</span>
                  <span className="font-medium">KSA Fashion Trading Co.</span>
                </div>
                <div className="flex justify-between">
                  <span>Account Number:</span>
                  <span className="font-medium">SA1234567890123456789012</span>
                </div>
                <div className="flex justify-between">
                  <span>IBAN:</span>
                  <span className="font-medium">SA65 1234 5678 9012 3456 7890 12</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium">SAR {calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  Please transfer the exact amount and upload your payment receipt. 
                  Your order will be processed once payment is verified.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Button size="lg" asChild>
              <Link href="/orders">
                View Order Status
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/shop">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
            }`}>
              {step > 1 ? <CheckCircle className="h-4 w-4" /> : '1'}
            </div>
            <span className="ml-2 font-medium">Shipping</span>
          </div>
          <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
          <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
            }`}>
              {step > 2 ? <CheckCircle className="h-4 w-4" /> : '2'}
            </div>
            <span className="ml-2 font-medium">Payment</span>
          </div>
          <div className={`flex-1 h-0.5 ${step >= 3 ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
          <div className={`flex items-center ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 3 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
            }`}>
              3
            </div>
            <span className="ml-2 font-medium">Confirmation</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Textarea
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, state: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveAddress"
                      checked={shippingInfo.saveAddress}
                      onCheckedChange={(checked) => 
<<<<<<< HEAD
                        setShippingInfo(prev => ({ ...prev, saveAddress: checked as boolean }))
=======
                        setShippingInfo(prev => ({ ...prev, saveAddress: checked }))
>>>>>>> origin/master
                      }
                    />
                    <Label htmlFor="saveAddress">Save this address for future orders</Label>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" asChild>
                      <Link href="/cart">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Cart
                      </Link>
                    </Button>
                    <Button type="submit">
                      Continue to Payment
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div>
                    <Label className="text-base font-medium">Select Payment Method</Label>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="mt-4 space-y-4"
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                        <Label htmlFor="bank_transfer" className="flex items-center cursor-pointer">
                          <Building2 className="h-5 w-5 mr-2" />
                          <div>
                            <div className="font-medium">Bank Transfer</div>
                            <div className="text-sm text-muted-foreground">
                              Pay via bank transfer (admin verification required)
                            </div>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 opacity-50">
                        <RadioGroupItem value="cash_on_delivery" id="cash_on_delivery" disabled />
                        <Label htmlFor="cash_on_delivery" className="flex items-center cursor-pointer">
                          <Truck className="h-5 w-5 mr-2" />
                          <div>
                            <div className="font-medium">Cash on Delivery</div>
                            <div className="text-sm text-muted-foreground">
                              Coming soon
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Bank Transfer Details */}
                  {paymentMethod === "bank_transfer" && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Bank Transfer Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Bank Name:</span>
                            <span className="font-medium">Saudi National Bank (SNB)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Account Name:</span>
                            <span className="font-medium">KSA Fashion Trading Co.</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Account Number:</span>
                            <span className="font-medium">SA1234567890123456789012</span>
                          </div>
                          <div className="flex justify-between">
                            <span>IBAN:</span>
                            <span className="font-medium">SA65 1234 5678 9012 3456 7890 12</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="bankName">Your Bank Name</Label>
                          <Input
                            id="bankName"
                            value={bankTransferInfo.bankName}
                            onChange={(e) => setBankTransferInfo(prev => ({ ...prev, bankName: e.target.value }))}
                            placeholder="e.g., Saudi National Bank"
                          />
                        </div>
                        <div>
                          <Label htmlFor="accountNumber">Your Account Number</Label>
                          <Input
                            id="accountNumber"
                            value={bankTransferInfo.accountNumber}
                            onChange={(e) => setBankTransferInfo(prev => ({ ...prev, accountNumber: e.target.value }))}
                            placeholder="Your bank account number"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="receiptImage">Upload Payment Receipt</Label>
                        <div className="mt-2">
                          <Input
                            id="receiptImage"
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="cursor-pointer"
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            Upload a screenshot or photo of your payment receipt (optional)
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          value={bankTransferInfo.notes}
                          onChange={(e) => setBankTransferInfo(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Any additional information about your payment"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Shipping
                    </Button>
                    <Button type="submit" disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "Place Order"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <div className="text-xs text-muted-foreground">
                        {item.size} / {item.color}
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm">Qty: {item.quantity}</span>
                        <span className="font-medium">
                          SAR {((item.salePrice || item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>SAR {calculateSubtotal().toFixed(2)}</span>
                </div>
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
                <div className="flex justify-between">
                  <span>Tax (15%)</span>
                  <span>SAR {calculateTax().toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>SAR {calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Notice */}
              {paymentMethod === "bank_transfer" && (
                <div className="bg-yellow-50 p-3 rounded-md">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">Payment Verification</span>
                  </div>
                  <p className="text-xs text-yellow-700 mt-1">
                    Your order will be processed once we verify your bank transfer payment.
                  </p>
                </div>
              )}

              {/* Security Badge */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>Secure checkout powered by KSA Fashion</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}