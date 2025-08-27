import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Award, 
  Users, 
  Globe, 
  Star,
  ArrowRight,
  Truck,
  Shield,
  RotateCcw
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Quality First",
      description: "We believe in delivering only the highest quality products that meet our customers' expectations."
    },
    {
      icon: Users,
      title: "Customer Centric",
      description: "Our customers are at the heart of everything we do. We strive to provide exceptional service and support."
    },
    {
      icon: Globe,
      title: "Cultural Heritage",
      description: "We celebrate Saudi Arabian culture and traditions through our carefully curated fashion collections."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We are committed to excellence in every aspect of our business, from product design to customer service."
    }
  ];

  const milestones = [
    { year: "2020", title: "Founded", description: "KSA Fashion was established with a vision to modernize traditional Saudi fashion." },
    { year: "2021", title: "First Store", description: "Opened our first flagship store in Riyadh, Saudi Arabia." },
    { year: "2022", title: "Online Launch", description: "Launched our e-commerce platform to serve customers nationwide." },
    { year: "2023", title: "Expansion", description: "Expanded our product range and reached 10,000+ satisfied customers." },
    { year: "2024", title: "Growth", description: "Continued growth with new collections and enhanced customer experience." }
  ];

  const team = [
    {
      name: "Abdullah Al-Rashid",
      role: "Founder & CEO",
      bio: "Visionary leader with over 15 years of experience in the fashion industry."
    },
    {
      name: "Fatima Al-Saud",
      role: "Creative Director",
      bio: "Talented designer passionate about blending traditional and modern fashion elements."
    },
    {
      name: "Khalid Abdullah",
      role: "Operations Manager",
      bio: "Experienced in supply chain management and customer service excellence."
    },
    {
      name: "Sara Hassan",
      role: "Marketing Director",
      bio: "Digital marketing expert focused on building brand awareness and customer engagement."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About KSA Fashion
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              We are more than just a clothing store. We are custodians of Saudi Arabian 
              fashion heritage, bringing traditional elegance to the modern world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/shop">
                  Shop Our Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/contact">
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground text-lg">
                From a humble beginning to becoming Saudi Arabia's premier fashion destination
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  KSA Fashion was born from a simple yet powerful vision: to make traditional Saudi fashion 
                  accessible to everyone while maintaining the highest standards of quality and authenticity.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Our journey began in 2020 when our founder, Abdullah Al-Rashid, recognized the need for 
                  a modern retail experience that celebrates Saudi cultural heritage. What started as a small 
                  boutique in Riyadh has now grown into a nationwide phenomenon, serving thousands of 
                  customers across the Kingdom.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, KSA Fashion stands as a testament to the beauty of Saudi fashion traditions, 
                  offering carefully curated collections that blend timeless elegance with contemporary style. 
                  We are proud to be part of our customers' most important moments, from weddings to 
                  everyday wear, providing clothing that makes them feel confident and connected to their roots.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4">
                      <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center">
                        <Heart className="h-12 w-12 text-primary" />
                      </div>
                    </div>
                    <p className="text-lg font-medium">Founded with Love</p>
                    <p className="text-muted-foreground">For Saudi Fashion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground text-lg">
              Key milestones in our growth story
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg">
              The passionate people behind KSA Fashion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <Badge variant="outline" className="mb-3">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose KSA Fashion?</h2>
            <p className="text-muted-foreground text-lg">
              What sets us apart from the rest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  Every product is carefully selected and inspected to ensure the highest quality standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Quick and reliable delivery across Saudi Arabia with tracking on all orders.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Easy Returns</h3>
                <p className="text-sm text-muted-foreground">
                  30-day return policy with hassle-free returns and exchanges.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-lg opacity-90">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-lg opacity-90">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-lg opacity-90">Cities Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8/5</div>
              <div className="text-lg opacity-90">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the KSA Fashion Family
            </h2>
            <p className="text-muted-foreground mb-8">
              Experience the perfect blend of tradition and modernity. Shop our collection today 
              and discover why thousands of customers trust us for their fashion needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/shop">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/contact">
                  Get in Touch
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}