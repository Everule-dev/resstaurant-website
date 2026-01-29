import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brown text-cream">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl">🍽️</span>
              <span className="text-2xl font-display font-bold text-primary">
                Savoria
              </span>
            </Link>
            <p className="text-cream/80 text-sm">
              Experience the finest culinary delights crafted with passion and the freshest ingredients.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-cream/80 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream/80 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream/80 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/menu" className="text-cream/80 hover:text-primary transition-colors text-sm">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cream/80 hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/location" className="text-cream/80 hover:text-primary transition-colors text-sm">
                  Location
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="text-cream/80 hover:text-primary transition-colors text-sm">
                  Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-cream/80">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>123 Gourmet Street, Foodie District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-cream/80">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-cream/80">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@savoria.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Opening Hours</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-sm text-cream/80">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Mon - Fri</p>
                  <p>11:00 AM - 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-cream/80">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">Sat - Sun</p>
                  <p>10:00 AM - 11:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cream/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/60 text-sm">
              © 2024 Savoria Restaurant. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-cream/60 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-cream/60 hover:text-primary transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
