import { Link } from "react-router-dom";
import { ArrowRight, Clock, Truck, Award, Star, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { getPopularItems } from "@/data/menuData";

const Index = () => {
  const { addItem } = useCart();
  const popularItems = getPopularItems().slice(0, 4);

  const highlights = [
    {
      icon: Award,
      title: "Fresh Ingredients",
      description: "We source the finest, freshest ingredients daily from local farmers",
    },
    {
      icon: Clock,
      title: "Quick Service",
      description: "Hot, delicious meals prepared and delivered in under 30 minutes",
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Enjoy free delivery on all orders above $25 within our service area",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "The best Italian food I've had outside of Italy! The carbonara is absolutely divine.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "Outstanding service and the ribeye steak was cooked to perfection. Highly recommend!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      name: "Emily Davis",
      rating: 5,
      comment: "A hidden gem! The ambiance, food, and staff are all exceptional. Will definitely return.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brown/90 via-brown/70 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-cream animate-fade-in">
            <span className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
              🔥 Now Serving Dinner
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Experience the Art of{" "}
              <span className="text-primary">Fine Dining</span>
            </h1>
            <p className="text-lg md:text-xl text-cream/90 mb-8">
              Indulge in a culinary journey where passion meets perfection. Every
              dish tells a story of fresh ingredients and expert craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/menu">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                >
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/reservation">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cream/50 text-cream hover:bg-cream/10"
                >
                  Book a Table
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <Card
                key={index}
                className="border-0 bg-card shadow-lg hover-lift"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Our Specialties</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              Popular Dishes
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Discover our most loved creations, crafted with passion and the
              finest ingredients to tantalize your taste buds
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item) => (
              <Card key={item.id} className="food-card group">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.isPopular && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <CardContent className="p-4">
                  <h4 className="font-display font-bold text-lg">{item.name}</h4>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-primary font-bold text-lg">
                      ${item.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => addItem(item)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/menu">
              <Button variant="outline" size="lg">
                View Full Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              What Our Guests Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <Card key={index} className="border-0 bg-card shadow-lg">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">&ldquo;{item.comment}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Verified Customer
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Preview Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-medium">Visit Us</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
                Find Our Restaurant
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-muted-foreground">
                      123 Gourmet Street, Foodie District, NY 10001
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Opening Hours</h4>
                    <p className="text-muted-foreground">
                      Mon-Fri: 11AM - 10PM | Sat-Sun: 10AM - 11PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <Link to="/location">
                  <Button className="bg-primary hover:bg-primary/90">
                    Get Directions
                  </Button>
                </Link>
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">WhatsApp Us</Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop"
                alt="Restaurant interior"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                <p className="text-3xl font-display font-bold">15+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-warm-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            Ready to Satisfy Your Cravings?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
            Order now and get free delivery on your first order. Fresh, hot, and
            delicious meals delivered right to your doorstep.
          </p>
          <Link to="/menu">
            <Button
              size="lg"
              className="bg-cream text-brown hover:bg-cream/90 font-semibold px-8"
            >
              Start Your Order
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
