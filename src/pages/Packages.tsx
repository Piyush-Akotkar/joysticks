import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, Gamepad2, CalendarDays, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/Footer";
import { STATIC_PACKAGES } from "@/lib/static-data";

export default function Packages() {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Navigation />

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-4"
          >
            CHOOSE YOUR <span className="text-primary text-glow">PACKAGE</span>
          </motion.h1>

          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Weekly and weekend rental plans crafted for every type of gamer.
            Premium gaming, zero commitment.
          </p>
        </div>

        {/* Trust Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          <div className="glass-panel rounded-2xl p-4 flex items-center gap-3">
            <CalendarDays className="text-primary w-6 h-6" />
            <span className="text-sm font-semibold">Flexible Weekly & Weekend Rentals</span>
          </div>

          <div className="glass-panel rounded-2xl p-4 flex items-center gap-3">
            <Gamepad2 className="text-primary w-6 h-6" />
            <span className="text-sm font-semibold">Pre-installed Popular Games</span>
          </div>

          <div className="glass-panel rounded-2xl p-4 flex items-center gap-3">
            <ShieldCheck className="text-primary w-6 h-6" />
            <span className="text-sm font-semibold">No Security Deposit</span>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {STATIC_PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex flex-col rounded-3xl p-8 relative overflow-hidden group transition-all duration-300 border ${
                pkg.featured
                  ? "border-primary/50 bg-card shadow-[0_0_35px_rgba(0,112,209,0.25)] scale-[1.02]"
                  : "bg-card border-white/5 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(0,112,209,0.15)]"
              }`}
            >
              {/* Featured Badge */}
              {pkg.featured && (
                <div className="absolute top-4 left-4 bg-primary text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              {/* Large Background Number */}
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-8xl font-display font-bold">{i + 1}</span>
              </div>

              <div className="relative z-10 flex-1 mt-6">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 min-h-[50px]">
                  {pkg.description}
                </p>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-display font-bold text-white group-hover:text-primary transition-colors">
                      ₹{pkg.price}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{pkg.duration}</p>
                  <p className="text-xs text-green-400 font-semibold mt-2">
                    Deposit: ₹{pkg.deposit}
                  </p>
                </div>

                {/* Controllers */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-white">{pkg.controllers}</p>
                  <p className="text-xs text-muted-foreground">{pkg.extraController}</p>
                </div>

                {/* Included */}
                <div className="space-y-4 mb-8">
                  <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                    What's Included:
                  </p>

                  <ul className="space-y-3">
                    {pkg.includedItems.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-primary border border-white/10">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <Link href={`/book?packageId=${pkg.id}`} className="relative z-10 mt-auto">
                <Button
                  className={`w-full h-12 text-lg font-bold rounded-xl transition-all ${
                    pkg.featured
                      ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                      : "bg-white text-black hover:bg-primary hover:text-white"
                  }`}
                >
                  Select Plan
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}