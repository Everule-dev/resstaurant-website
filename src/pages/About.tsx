import { Award, Users, Heart, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const team = [
    {
      name: "Marco Romano",
      role: "Executive Chef",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&h=300&fit=crop",
      bio: "With over 20 years of culinary experience, Chef Marco brings authentic Italian flavors to every dish.",
    },
    {
      name: "Sarah Chen",
      role: "Pastry Chef",
      image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=300&h=300&fit=crop",
      bio: "A master of sweet creations, Sarah crafts desserts that are as beautiful as they are delicious.",
    },
    {
      name: "David Miller",
      role: "Head Sommelier",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      bio: "David curates our wine selection with expertise, ensuring perfect pairings for every meal.",
    },
  ];

  const values = [
    {
      icon: Award,
      title: "Quality First",
      description: "We never compromise on the quality of our ingredients or service.",
    },
    {
      icon: Heart,
      title: "Passion for Food",
      description: "Every dish is prepared with love and dedication to culinary excellence.",
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "We believe in building lasting relationships with our guests and community.",
    },
    {
      icon: Utensils,
      title: "Innovation",
      description: "Blending traditional recipes with modern techniques for unique experiences.",
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1554679665-f5537f187268?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1920&h=800&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-brown/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center text-cream">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Our Story
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-cream/90">
            A journey of passion, flavor, and unforgettable dining experiences
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-medium">Since 2009</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">
                A Culinary Journey
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Savoria was born from a simple dream: to create a place where
                  exceptional food meets warm hospitality. Founded in 2009 by Chef
                  Marco Romano, our restaurant has grown from a small family-run
                  eatery to one of the city's most beloved dining destinations.
                </p>
                <p>
                  Our philosophy is rooted in the belief that great food starts
                  with great ingredients. We source locally whenever possible,
                  working directly with farmers and suppliers who share our
                  commitment to quality and sustainability.
                </p>
                <p>
                  Every dish that leaves our kitchen tells a story - of tradition,
                  innovation, and the countless hours of passion poured into
                  perfecting each recipe. We invite you to be part of this story.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&h=500&fit=crop"
                alt="Chef at work"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg hidden md:block">
                <p className="text-3xl font-display font-bold">50k+</p>
                <p className="text-sm">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, index) => (
              <Card key={index} className="border-0 bg-card shadow-lg text-center hover-lift">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">The Faces Behind Your Meals</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              Meet Our Team
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden hover-lift">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-display font-bold">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Take a Peek</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-2">
              Our Gallery
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="aspect-[4/3] overflow-hidden rounded-xl"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
