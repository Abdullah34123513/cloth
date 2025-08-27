"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Loader2
} from "lucide-react";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
}

interface Order {
  id: string;
  orderNumber: string;
  user: { name: string; email: string };
  total: number;
  status: string;
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: { name: string };
  variants: Array<{ stock: number }>;
  isActive: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Payment {
  id: string;
  order: { orderNumber: string; user: { name: string } };
  amount: number;
  method: string;
  status: string;
  receiptImage?: string;
  createdAt: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || session.user?.role !== "ADMIN") {
      router.push("/login");
      return;
    }

    fetchDashboardData();
  }, [session, status, router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        fetch('/api/products?limit=1000'),
        fetch('/api/orders'),
        fetch('/api/users')
      ]);

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setStats(prev => ({
          ...prev,
          totalProducts: productsData.pagination?.total || 0
        }));
        setProducts(productsData.products || []);
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData || []);
        const totalRevenue = ordersData.reduce((sum: number, order: Order) => sum + order.total, 0);
        setStats(prev => ({
          ...prev,
          totalOrders: ordersData.length || 0,
          totalRevenue
        }));
      }

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData || []);
        setStats(prev => ({
          ...prev,
          totalUsers: usersData.length || 0
        }));
      }

      // Fetch pending payments
      const paymentsRes = await fetch('/api/orders');
      if (paymentsRes.ok) {
        const allOrders = await paymentsRes.json();
        const pendingPayments = allOrders
          .filter((order: Order) => order.status === 'PENDING')
          .map((order: Order) => ({
            id: order.id,
            order: {
              orderNumber: order.orderNumber,
              user: { name: order.user.name }
            },
            amount: order.total,
            method: "Bank Transfer",
            status: "PENDING",
            createdAt: order.createdAt
          }));
        setPayments(pendingPayments);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      true: { variant: "default", label: "Active" },
      false: { variant: "destructive", label: "Inactive" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.true;

    return (
      <Badge variant={config.variant as any}>
        {config.label}
      </Badge>
    );
  };

  const getOrderStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { variant: "secondary", icon: Clock, label: "Pending" },
      PROCESSING: { variant: "default", icon: Package, label: "Processing" },
      SHIPPED: { variant: "secondary", icon: Package, label: "Shipped" },
      DELIVERED: { variant: "default", icon: CheckCircle, label: "Delivered" },
      CANCELLED: { variant: "destructive", label: "Cancelled" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;

    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        {config.label}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      ADMIN: { variant: "destructive", label: "Admin" },
      CUSTOMER: { variant: "default", label: "Customer" }
    };

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.CUSTOMER;

    return (
      <Badge variant={config.variant as any}>
        {config.label}
      </Badge>
    );
  };

  const handleVerifyPayment = async (paymentId: string) => {
    try {
      const response = await fetch(`/api/payments/${paymentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'PAID', verifiedAt: new Date().toISOString() })
      });

      if (response.ok) {
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!session || session.user?.role !== "ADMIN") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your e-commerce store
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                    <p className="text-2xl font-bold">{stats.totalProducts}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                    <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setActiveTab("orders")}>
                  View All Orders
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.slice(0, 5).map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>{order.user.name}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => setActiveTab("orders")}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pending Payments Alert */}
          {payments.length > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <AlertTriangle className="h-5 w-5" />
                  Pending Payments ({payments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {payments.slice(0, 3).map(payment => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium">{payment.order.orderNumber}</div>
                        <div className="text-sm text-muted-foreground">
                          {payment.order.user.name} • ${payment.amount.toFixed(2)}
                        </div>
                      </div>
                      <Button size="sm" onClick={() => setActiveTab("payments")}>
                        Verify Payment
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Products</h2>
            <Button onClick={() => router.push('/admin/products/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <Input placeholder="Search products..." className="max-w-sm" />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map(product => {
                    const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
                    return (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.category.name}</TableCell>
                        <TableCell>
                          <span className={totalStock === 0 ? "text-red-600 font-medium" : ""}>
                            {totalStock}
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(product.isActive.toString())}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => router.push(`/admin/products/${product.id}`)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => router.push(`/product/${product.id}`)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Orders</h2>
            <Button variant="outline">
              Export Orders
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex gap-4">
                <Input placeholder="Search orders..." className="max-w-sm" />
                <select className="px-3 py-2 border rounded-md">
                  <option value="">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                </select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map(order => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>{order.user.name}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <select 
                            className="px-2 py-1 text-sm border rounded"
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="PROCESSING">Processing</option>
                            <option value="SHIPPED">Shipped</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Payment Verification</h2>
            <Badge variant="secondary" className="flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              {payments.length} Pending
            </Badge>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {payments.map(payment => (
                  <div key={payment.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{payment.order.orderNumber}</h3>
                        <p className="text-muted-foreground">
                          {payment.order.user.name} • {new Date(payment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${payment.amount.toFixed(2)}</div>
                        <Badge variant="outline">{payment.method}</Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        {payment.receiptImage ? (
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                              <Eye className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <span className="text-sm">Receipt uploaded</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">No receipt uploaded</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm" onClick={() => handleVerifyPayment(payment.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Verify Payment
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Users</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <Input placeholder="Search users..." className="max-w-sm" />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}