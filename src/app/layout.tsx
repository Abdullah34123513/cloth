import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KSA Fashion - Premium Clothing Store in Saudi Arabia",
  description: "Discover the latest fashion trends at KSA Fashion. Premium clothing for men and women with fast delivery across Saudi Arabia.",
  keywords: ["KSA Fashion", "clothing", "fashion", "Saudi Arabia", "online shopping", "premium clothing"],
  authors: [{ name: "KSA Fashion Team" }],
  openGraph: {
    title: "KSA Fashion - Premium Clothing Store",
    description: "Your premier destination for premium clothing in Saudi Arabia",
    url: "https://ksafashion.com",
    siteName: "KSA Fashion",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KSA Fashion - Premium Clothing Store",
    description: "Your premier destination for premium clothing in Saudi Arabia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Providers>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
