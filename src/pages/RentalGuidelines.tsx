import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function RentalGuidelines() {
  useEffect(() => {
    document.title = "Rental Guidelines | Joysticks Joy";
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
          RENTAL <span className="text-primary">GUIDELINES</span>
        </motion.h1>

        <div className="glass-panel rounded-3xl p-8 md:p-12 space-y-8 leading-relaxed text-gray-300">
          <section>
            <h2 className="text-2xl text-white mb-3">Exchange Policy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Exchanges allowed only before rental begins</li>
              <li>Requests must be submitted at least 12 hours in advance</li>
              <li>Subject to console/game availability</li>
              <li>No exchanges after rental start</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-3">Damage Policy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Customers are fully responsible for loss or damage</li>
              <li>Minor wear is acceptable</li>
              <li>Major damage incurs repair/replacement charges</li>
              <li>Non-payment may restrict future rentals</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-3">Best Practices</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Keep console ventilated and dust-free</li>
              <li>Handle controllers carefully</li>
              <li>Do not delete pre-installed core system files</li>
              <li>Return all accessories including HDMI, power cable, and controllers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-3">Support</h2>
            <p>
              For technical help, delayed delivery, or urgent assistance, contact Joysticks Joy support directly through WhatsApp or customer service.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}