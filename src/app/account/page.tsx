"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  Edit, 
  Save, 
  LogOut,
  Package,
  Truck,
  CheckCircle,
  Clock
} from "lucide-react";

export default function AccountPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [userData, setUserData] = useState({
    firstName: "Ahmed",
    lastName: "Mohammed",
    email: "customer@example.com",
    phone: "+966 50 123 4567",
    country: "Saudi Arabia",
    city: "Riyadh",
    address: "123 King Fahd Road, Riyadh",
    zipCode: "12345"
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Mock order data
  const orders = [
    {
      id: "KSA-123456789",
      date: "2024-01-15",
      status: "DELIVERED",
      total: 748.50,
      items: [
        { name: "Premium Thobe", quantity: 1, price: 249 },
        { name: "Elegant Abaya", quantity: 2, price: 399 }
      ]
    },
    {
      id: "KSA-987654321",
      date: "2024-01-20",
      status: "PROCESSING",
      total: 149.00,
      items: [
        { name: "Designer Hijab", quantity: 1, price: 149 }
      ]
    },
    {
      id: "KSA-456789123",
      date: "2024-01-25",
      status: "SHIPPED",
      total: 349.00,
      items: [
        { name: "Modern Kandura", quantity: 1, price: 349 }
      ]
    }
  ];

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Simulate API call
      setTimeout(() => {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile" });
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Simulate API call
      setTimeout(() => {
        setMessage({ type: "success", text: "Password changed successfully!" });
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to change password" });
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { variant: "secondary", icon: Clock, label: "Pending" },
      PROCESSING: { variant: "default", icon: Package, label: "Processing" },
      SHIPPED: { variant: "secondary", icon: Truck, label: "Shipped" },
      DELIVERED: { variant: "default", icon: CheckCircle, label: "Delivered" },
    CANCELLED: { variant: "destructive", icon: Clock, label: "Cancelled" }
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

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Account</h1>
        <p className="text-muted-foreground">
          Manage your profile, orders, and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-semibold">
                  {userData.firstName} {userData.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
              </div>

              <Separator className="my-4" />

              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#profile">Profile Information</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#orders">Order History</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="#security">Security</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/addresses">Addresses</a>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <a href="/wishlist">Wishlist</a>
                </Button>
              </nav>

              <Separator className="my-4" />

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => signOut()}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Profile Information</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {message.text && (
                    <Alert className={message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                      <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
                        {message.text}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input
                        value={userData.firstName}
                        onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input
                        value={userData.lastName}
                        onChange={(e) => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Select value={userData.country} disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                          <SelectItem value="UAE">UAE</SelectItem>
                          <SelectItem value="Kuwait">Kuwait</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        value={userData.city}
                        onChange={(e) => setUserData(prev => ({ ...prev, city: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input
                      value={userData.address}
                      onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>ZIP Code</Label>
                    <Input
                      value={userData.zipCode}
                      onChange={(e) => setUserData(prev => ({ ...prev, zipCode: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>

                  {isEditing && (
                    <Button onClick={handleSaveProfile} disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map(order => (
                      <Card key={order.id} className="border">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold">Order #{order.id}</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            {getStatusBadge(order.status)}
                          </div>

                          <div className="space-y-2 mb-4">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{item.quantity}x {item.name}</span>
                                <span>SAR {item.price.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>

                          <Separator className="my-4" />

                          <div className="flex justify-between items-center">
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">Total</div>
                              <div className="font-semibold">SAR {order.total.toFixed(2)}</div>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {message.text && (
                    <Alert className={message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                      <AlertDescription className={message.type === "success" ? "text-green-800" : "text-red-800"}>
                        {message.text}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm new password"
                    />
                  </div>

                  <Button onClick={handleChangePassword} disabled={isLoading}>
                    {isLoading ? "Changing Password..." : "Change Password"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <Button variant="outline">
                      Enable 2FA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}