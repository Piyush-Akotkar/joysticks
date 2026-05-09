import { Link } from "wouter";
import { MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-white/5 mt-20 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
              src="/jsj-logo.png"
              alt="PS5 Rental Logo"
              className="h-8 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,112,209,0.35)]"
            />
            </div>
            <p className="text-sm text-muted-foreground">
              Experience next-gen gaming delivered to your doorstep in Pune.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/packages" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/games" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Game Library
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Service</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Pune City Only</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Available via WhatsApp</span>
              </li>
              <li className="flex items-start gap-2">
                <span>2-hour Delivery</span>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms-conditions" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/rental-guidelines" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Rental Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2026 PS5 Rental. All rights reserved.</p>
          <p>Premium gaming experiences delivered to Pune.</p>
        </div>
      </div>
    </footer>
  );
}
