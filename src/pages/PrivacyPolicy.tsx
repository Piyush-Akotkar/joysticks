import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Joysticks Joy";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0">
      <Navigation />

      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display font-bold mb-8"
        >
          PRIVACY <span className="text-primary">POLICY</span>
        </motion.h1>

        <div className="glass-panel rounded-3xl p-8 md:p-12 space-y-8 leading-relaxed text-gray-300">
          <section>
            <h2 className="text-2xl text-white mb-3">Your Privacy Matters</h2>
            <p>
              At Joysticks Joy, we respect your privacy and are committed to protecting your personal information.
              We collect customer data solely to provide, maintain, and improve our PS5 rental services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-3">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full name, phone number, and delivery address</li>
              <li>Government-issued identification and address verification</li>
              <li>Payment and transaction details</li>
              <li>Rental history and service preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-3">How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processing bookings and payments</li>
              <li>Delivery coordination and customer support</li>
              <li>Fraud prevention and identity verification</li>
              <li>Service updates, offers, and improvements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-3">Data Protection</h2>
            <p>
              We implement reasonable security measures to safeguard your information against unauthorized access,
              misuse, or disclosure. Your data is never sold to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-3">Third-Party Services</h2>
            <p>
              Certain operations such as payment processing or legal compliance may require limited data sharing with
              trusted partners or authorities when legally required.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-3">Consent</h2>
            <p>
              By using Joysticks Joy services, you consent to this privacy policy and our responsible handling of your data.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}