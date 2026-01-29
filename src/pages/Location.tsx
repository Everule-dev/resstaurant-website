import { MapPin, Phone, Mail, Clock, Car, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Location = () => {
  const openingHours = [
    { day: "Monday", hours: "11:00 AM - 10:00 PM" },
    { day: "Tuesday", hours: "11:00 AM - 10:00 PM" },
    { day: "Wednesday", hours: "11:00 AM - 10:00 PM" },
    { day: "Thursday", hours: "11:00 AM - 10:00 PM" },
    { day: "Friday", hours: "11:00 AM - 11:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 10:00 PM" },
  ];

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-primary font-medium">Find Us</span>
          <h1 className="text-3xl md:text-5xl font-display font-bold mt-2">
            Visit Our Restaurant
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We'd love to welcome you to Savoria. Here's everything you need to
            know about finding us and getting in touch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <Card className="overflow-hidden h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1635959481000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant Location"
              />
            </Card>
          </div>

          {/* Contact Info */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Address Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <MapPin className="h-5 w-5 text-primary" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  123 Gourmet Street<br />
                  Foodie District<br />
                  New York, NY 10001
                </p>
                <a
                  href="https://maps.google.com/?q=123+Gourmet+Street+New+York+NY+10001"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="mt-4 bg-primary hover:bg-primary/90">
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <Phone className="h-5 w-5 text-primary" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:hello@savoria.com" className="text-muted-foreground hover:text-primary">
                      hello@savoria.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 pt-2">
                  <a href="tel:+15551234567">
                    <Button variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                  <a
                    href="https://wa.me/15551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-green-600 hover:bg-green-700">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Opening Hours Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <Clock className="h-5 w-5 text-primary" />
                  Opening Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {openingHours.map((item) => (
                    <li
                      key={item.day}
                      className={`flex justify-between py-2 px-3 rounded-lg ${
                        item.day === today
                          ? "bg-primary/10 text-primary font-medium"
                          : ""
                      }`}
                    >
                      <span>{item.day}</span>
                      <span>{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Parking Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display">
                  <Car className="h-5 w-5 text-primary" />
                  Parking Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Free street parking available after 6 PM
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Public parking garage located 1 block away
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Valet parking available on weekends
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Easily accessible by subway (Line 1, 2, 3)
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
