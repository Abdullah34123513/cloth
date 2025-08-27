"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Search,
  Filter,
  Eye,
  Download,
  Calendar
} from "lucide-react";

export default function OrdersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock order data
  const orders = [
    {
      id: "KSA-123456789",
      date: "2024-01-15",
      status: "DELIVERED",
      paymentStatus: "PAID",
      total: 748.50,
      items: [
        { name: "Premium Thobe", quantity: 1, price: 249, image: "/api/placeholder/60/80" },
        { name: "Elegant Abaya", quantity: 2, price: 399, image: "/api/placeholder/60/80" }
      ],
      shippingAddress: {
        firstName: "Ahmed",
        lastName: "Mohammed",
        address: "123 King Fahd Road, Riyadh",
        city: "Riyadh",
        country: "Saudi Arabia",
        phone: "+966 50 123 4567"
      },
      trackingNumber: "SA1234567890",
      estimatedDelivery: "2024-01-18"
    },
    {
      id: "KSA-987654321",
      date: "2024-01-20",
      status: "PROCESSING",
      paymentStatus: "PENDING",
      total: 149.00,
      items: [
        { name: "Designer Hijab", quantity: 1, price: 149, image: "/api/placeholder/60/80" }
      ],
      shippingAddress: {
        firstName: "Ahmed",
        lastName: "Mohammed",
        address: "123 King Fahd Road, Riyadh",
        city: "Riyadh",
        country: "Saudi Arabia",
        phone: "+966 50 123 4567"
      },
      trackingNumber: null,
      estimatedDelivery: "2024-01-25"
    },
    {
      id: "KSA-456789123",
      date: "2024-01-25",
      status: "SHIPPED",
      paymentStatus: "PAID",
      total: 349.00,
      items: [
        { name: "Modern Kandura", quantity: 1, price: 349, image: "/api/placeholder/60/80" }
      ],
      shippingAddress: {
        firstName: "Ahmed",
        lastName: "Mohammed",
        address: "123 King Fahd Road, Riyadh",
        city: "Riyadh",
        country: "Saudi Arabia",
        phone: "+966 50 123 4567"
      },
      trackingNumber: "SA0987654321",
      estimatedDelivery: "2024-01-28"
    },
    {
      id: "KSA-789123456",
      date: "2024-01-28",
      status: "PENDING",
      paymentStatus: "PENDING",
      total: 599.00,
      items: [
        { name: "Luxury Bisht", quantity: 1, price: 599, image: "/api/placeholder/60/80" }
      ],
      shippingAddress: {
        firstName: "Ahmed",
        lastName: "Mohammed",
        address: "123 King Fahd Road, Riyadh",
        city: "Riyadh",
        country: "Saudi Arabia",
        phone: "+966 50 123 4567"
      },
      trackingNumber: null,
      estimatedDelivery: "2024-02-02"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { variant: "secondary", icon: Clock, label: "Pending" },
      PROCESSING: { variant: "default", icon: Package, label: "Processing" },
      SHIPPED: { variant: "secondary", icon: Truck, label: "Shipped" },
      DELIVERED: { variant: "default", icon: CheckCircle, label: "Delivered" },
      CANCELLED: { variant: "destructive", icon: XCircle, label: "Cancelled" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { variant: "secondary", label: "Pending" },
      PAID: { variant: "default", label: "Paid" },
      FAILED: { variant: "destructive", label: "Failed" },
      REFUNDED: { variant: "outline", label: "Refunded" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;

    return (
      <Badge variant={config.variant as any}>
        {config.label}
      </Badge>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    const matchesDate = dateFilter === "all" || 
                       (dateFilter === "week" && new Date(order.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
                       (dateFilter === "month" && new Date(order.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

    return matchesSearch && matchesStatus && matchesDate;
  });

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">
          Track and manage your orders
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="SHIPPED">Shipped</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all" || dateFilter !== "all" 
                  ? "Try adjusting your filters to see more results."
                  : "You haven't placed any orders yet."
                }
              </p>
              <Button asChild>
                <a href="/shop">Start Shopping</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map(order => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Order Items */}
                  <div className="lg:w-2/3">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {getStatusBadge(order.status)}
                        {getPaymentStatusBadge(order.paymentStatus)}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-20 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">SAR {item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Info */}
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <p className="text-sm text-muted-foreground">
                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                        {order.shippingAddress.address}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.country}<br />
                        {order.shippingAddress.phone}
                      </p>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="lg:w-1/3">
                    <div className="space-y-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Total Amount</div>
                        <div className="text-2xl font-bold">SAR {order.total.toFixed(2)}</div>
                      </div>

                      {order.trackingNumber && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm font-medium text-blue-900 mb-1">
                            Tracking Number
                          </div>
                          <div className="text-sm text-blue-800 font-mono">
                            {order.trackingNumber}
                          </div>
                        </div>
                      )}

                      {order.estimatedDelivery && (
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-sm font-medium text-green-900 mb-1">
                            Estimated Delivery
                          </div>
                          <div className="text-sm text-green-800">
                            {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>

                      {order.status === "PENDING" && (
                        <Button variant="destructive" size="sm" className="w-full">
                          Cancel Order
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}