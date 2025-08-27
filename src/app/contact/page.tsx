"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Simulate API call
      setTimeout(() => {
        setSubmitStatus({ 
          type: "success", 
          message: "Thank you for contacting us! We'll get back to you within 24 hours." 
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      setSubmitStatus({ 
        type: "error", 
        message: "Failed to send message. Please try again later." 
      });
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: [
        "123 King Fahd Road",
        "Riyadh, Saudi Arabia 12345"
      ]
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "+966 12 345 6789",
        "+966 50 123 4567"
      ]
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "support@ksafashion.com",
        "info@ksafashion.com"
      ]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Saturday - Thursday: 9:00 AM - 10:00 PM",
        "Friday: 2:00 PM - 10:00 PM"
      ]
    }
  ];

  const faqs = [
    {
      question: "How can I track my order?",
      answer: "You can track your order by logging into your account and viewing your order history. You'll also receive email updates with tracking information."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in their original packaging. Please visit our returns page for more details."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we only ship within Saudi Arabia. We're working on expanding our shipping options to other countries soon."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach us through phone, email, or by filling out the contact form on this page. Our support team is available 24/7."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              We're here to help! Get in touch with our team for any questions, 
              concerns, or feedback about our products and services.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitStatus.message && (
                    <Alert className={submitStatus.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                      <AlertDescription className={submitStatus.type === "success" ? "text-green-800" : "text-red-800"}>
                        {submitStatus.message}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+966 5X XXX XXXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="order">Order Status</SelectItem>
                        <SelectItem value="return">Return/Exchange</SelectItem>
                        <SelectItem value="product">Product Information</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b pb-6 last:border-b-0">
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Cards */}
            {contactInfo.map((info, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-sm text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Live Chat */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Need Immediate Help?</h3>
                  <p className="text-sm text-green-800 mb-4">
                    Chat with our support team for instant assistance
                  </p>
                  <Button variant="outline" className="w-full">
                    Start Live Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Stay connected for the latest updates, promotions, and fashion tips
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="w-12 h-12">
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-12 h-12">
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-12 h-12">
                    <Instagram className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Store Location */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Visit Our Store</h3>
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Experience our collections in person at our flagship store in Riyadh
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}