"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronRight, 
  Search, 
  Package, 
  Truck, 
  CreditCard, 
  RotateCcw,
  User,
  Shield,
  HelpCircle
} from "lucide-react";

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      icon: HelpCircle,
      color: "blue",
      questions: [
        {
          id: "gen1",
          question: "What is KSA Fashion?",
          answer: "KSA Fashion is a premier online clothing store specializing in traditional and contemporary Saudi Arabian fashion. We offer high-quality thobes, abayas, kanduras, hijabs, and accessories for men and women."
        },
        {
          id: "gen2",
          question: "Where are your products made?",
          answer: "Our products are carefully sourced from reputable manufacturers in Saudi Arabia and other GCC countries. We ensure all products meet our high-quality standards and cultural authenticity."
        },
        {
          id: "gen3",
          question: "Do you have physical stores?",
          answer: "Yes, we have a flagship store in Riyadh at 123 King Fahd Road. We're also planning to open more stores across Saudi Arabia in the near future."
        }
      ]
    },
    {
      id: "orders",
      title: "Orders & Shipping",
      icon: Package,
      color: "green",
      questions: [
        {
          id: "ord1",
          question: "How can I place an order?",
          answer: "You can place an order through our website by browsing our products, adding items to your cart, and proceeding to checkout. You'll need to create an account or guest checkout to complete your purchase."
        },
        {
          id: "ord2",
          question: "What shipping methods do you offer?",
          answer: "We offer standard shipping (2-3 business days) and express shipping (1-2 business days) across Saudi Arabia. Free shipping is available for orders over SAR 200."
        },
        {
          id: "ord3",
          question: "How can I track my order?",
          answer: "Once your order is shipped, you'll receive a tracking number via email. You can use this number on our website or the shipping carrier's website to track your package."
        },
        {
          id: "ord4",
          question: "Do you ship internationally?",
          answer: "Currently, we only ship within Saudi Arabia. We're working on expanding our shipping options to other GCC countries soon."
        }
      ]
    },
    {
      id: "payment",
      title: "Payment Methods",
      icon: CreditCard,
      color: "yellow",
      questions: [
        {
          id: "pay1",
          question: "What payment methods do you accept?",
          answer: "We currently accept bank transfers. You can transfer the payment to our bank account and upload the receipt for verification. We're working on adding more payment options soon."
        },
        {
          id: "pay2",
          question: "How does bank transfer payment work?",
          answer: "After placing your order, you'll receive our bank details. Transfer the exact amount and upload your payment receipt. Our team will verify the payment and process your order."
        },
        {
          id: "pay3",
          question: "Is my payment information secure?",
          answer: "Yes, we take security very seriously. While we currently use bank transfers, all your personal information is encrypted and stored securely."
        },
        {
          id: "pay4",
          question: "How long does payment verification take?",
          answer: "Payment verification typically takes 1-2 business days. You'll receive a confirmation email once your payment is verified and your order is processed."
        }
      ]
    },
    {
      id: "returns",
      title: "Returns & Exchanges",
      icon: RotateCcw,
      color: "orange",
      questions: [
        {
          id: "ret1",
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for all unused items in their original packaging. Items must be returned with all tags attached and in original condition."
        },
        {
          id: "ret2",
          question: "How do I return an item?",
          answer: "To return an item, log into your account, go to your order history, and select the item you want to return. Follow the instructions to generate a return label and send the item back to us."
        },
        {
          id: "ret3",
          question: "Who pays for return shipping?",
          answer: "If the return is due to our error (wrong item, defective product), we'll cover the return shipping. For customer-initiated returns, you'll be responsible for the shipping cost."
        },
        {
          id: "ret4",
          question: "How long does it take to process returns?",
          answer: "Once we receive your return, it takes 3-5 business days to process. Refunds are issued to your original payment method within 5-7 business days after processing."
        }
      ]
    },
    {
      id: "account",
      title: "Account & Security",
      icon: User,
      color: "purple",
      questions: [
        {
          id: "acc1",
          question: "How do I create an account?",
          answer: "Click on 'Sign Up' in the top right corner of our website. Fill in your details including name, email, phone number, and create a password. You'll receive a confirmation email to activate your account."
        },
        {
          id: "acc2",
          question: "I forgot my password. How can I reset it?",
          answer: "Click on 'Forgot Password' on the login page. Enter your email address and we'll send you a link to reset your password. Follow the instructions in the email to create a new password."
        },
        {
          id: "acc3",
          question: "How can I update my account information?",
          answer: "Log into your account and go to 'My Account' section. From there, you can update your personal information, shipping addresses, and password."
        },
        {
          id: "acc4",
          question: "Is my personal information secure?",
          answer: "Yes, we use industry-standard security measures to protect your personal information. We never share your data with third parties without your consent."
        }
      ]
    },
    {
      id: "products",
      title: "Product Information",
      icon: Shield,
      color: "red",
      questions: [
        {
          id: "prod1",
          question: "How do I choose the right size?",
          answer: "Each product has a detailed size guide. You can find it on the product page. If you're unsure between sizes, we recommend choosing the larger size for a more comfortable fit."
        },
        {
          id: "prod2",
          question: "How should I care for my garments?",
          answer: "Care instructions are provided on each product page and on the garment's label. Generally, we recommend machine washing in cold water and hanging to dry for best results."
        },
        {
          id: "prod3",
          question: "Are your products authentic?",
          answer: "Yes, all our products are 100% authentic. We work directly with manufacturers and authorized distributors to ensure product authenticity."
        },
        {
          id: "prod4",
          question: "Do you offer gift wrapping?",
          answer: "Yes, we offer gift wrapping services for a small additional fee. You can select this option during checkout. We also include a personalized message card with your gift."
        }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedQuestion(null);
  };

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const getColorClass = (color: string) => {
    const colorClasses = {
      blue: "text-blue-600 bg-blue-100",
      green: "text-green-600 bg-green-100",
      yellow: "text-yellow-600 bg-yellow-100",
      orange: "text-orange-600 bg-orange-100",
      purple: "text-purple-600 bg-purple-100",
      red: "text-red-600 bg-red-100"
    };
    return colorClasses[color as keyof typeof colorClasses] || "text-gray-600 bg-gray-100";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Find answers to common questions about our products, services, and policies
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-3 text-lg"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {filteredCategories.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <HelpCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try searching with different keywords or browse all categories below.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredCategories.map(category => (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getColorClass(category.color)}`}>
                        <category.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <Badge variant="secondary">{category.questions.length}</Badge>
                    </div>
                    {expandedCategory === category.id ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                
                {expandedCategory === category.id && (
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {category.questions.map(question => (
                        <div key={question.id} className="border rounded-lg overflow-hidden">
                          <button
                            className="w-full p-4 text-left hover:bg-muted/50 transition-colors flex items-center justify-between"
                            onClick={() => toggleQuestion(question.id)}
                          >
                            <span className="font-medium">{question.question}</span>
                            {expandedQuestion === question.id ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                          
                          {expandedQuestion === question.id && (
                            <div className="px-4 pb-4">
                              <p className="text-muted-foreground">{question.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>

        {/* Still Have Questions */}
        <Card className="mt-12">
          <CardContent className="p-8 text-center">
            <HelpCircle className="h-16 w-16 mx-auto text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/contact">
                  Contact Support
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/contact">
                  Start Live Chat
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}