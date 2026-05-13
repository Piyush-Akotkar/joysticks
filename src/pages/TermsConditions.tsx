import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function TermsConditions() {
  useEffect(() => {
    document.title = "Terms & Conditions | Joysticks Joy";
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
          TERMS & <span className="text-primary">CONDITIONS</span>
        </motion.h1>

        <div className="glass-panel rounded-3xl p-8 md:p-12 space-y-8 leading-relaxed text-gray-300">
          <section>
            <h2 className="text-2xl text-white mb-3">Rental Agreement</h2>
            <p>By renting from Joysticks Joy, you agree to all rental, payment, return, and equipment usage policies.</p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-3">Required Verification</h2>
            <p>Valid government-issued ID and proof of address are mandatory before rental confirmation.</p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-3">Payment Terms</h2>
            <p>All rental charges must be paid upfront according to your selected package.</p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-3">Equipment Usage Rules</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>No sub-renting</li>
              <li>No physical tampering or software modification</li>
              <li>Use equipment responsibly and safely</li>
              <li>Keep accessories intact</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-3">Late Returns</h2>
            <p>Late returns may result in additional daily or hourly charges depending on package terms.</p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-3">Liability Disclaimer</h2>
            <p>
              Joysticks Joy is not liable for software issues, saved data loss, account bans, or digital purchases made during rental use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-3">Cancellation Policy</h2>
            <p>Cancellations must be made at least 24 hours before rental start time. Refunds may be subject to processing deductions.</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}