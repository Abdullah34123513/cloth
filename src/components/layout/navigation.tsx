"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const { data: session, status } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <img
                  src="/logo.svg"
                  alt="KSA Fashion"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-xl">KSA Fashion</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User Menu */}
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    Signed in as {session.user?.email}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  {session.user?.role === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="text-primary">
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/signup">Sign Up</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>
                    Browse our collection of premium clothing
                  </SheetDescription>
                </SheetHeader>
                <nav className="mt-6 flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium transition-colors hover:text-primary py-2"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    {session ? (
                      <>
                        <div className="px-2 py-1.5 text-sm text-muted-foreground mb-2">
                          Signed in as {session.user?.email}
                        </div>
                        <Link
                          href="/account"
                          className="text-sm font-medium transition-colors hover:text-primary py-2 block"
                        >
                          My Account
                        </Link>
                        <Link
                          href="/orders"
                          className="text-sm font-medium transition-colors hover:text-primary py-2 block"
                        >
                          My Orders
                        </Link>
                        {session.user?.role === "ADMIN" && (
                          <Link
                            href="/admin"
                            className="text-sm font-medium transition-colors hover:text-primary py-2 block text-primary"
                          >
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={handleSignOut}
                          className="text-sm font-medium transition-colors hover:text-primary py-2 block w-full text-left"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="text-sm font-medium transition-colors hover:text-primary py-2 block"
                        >
                          Login
                        </Link>
                        <Link
                          href="/signup"
                          className="text-sm font-medium transition-colors hover:text-primary py-2 block"
                        >
                          Sign Up
                        </Link>
                        <Link
                          href="/account"
                          className="text-sm font-medium transition-colors hover:text-primary py-2 block"
                        >
                          My Account
                        </Link>
                        <Link
                          href="/orders"
                          className="text-sm font-medium transition-colors hover:text-primary py-2 block"
                        >
                          My Orders
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                type="search"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}