import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BookingForm } from "@/components/BookingForm";
import { STATIC_PACKAGES, STATIC_GAMES } from "@/lib/static-data";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Book() {
  const params = new URLSearchParams(window.location.search);
  
  const initialPackageId = params.get("packageId") ? parseInt(params.get("packageId")!) : undefined;
  const initialGameIds = params.get("gameIds") ? params.get("gameIds")!.split(",").map(Number) : [];

  const packages = STATIC_PACKAGES;
  const games = STATIC_GAMES;

  const selectedPackage = packages.find(p => p.id === initialPackageId);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Summary */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                FINALIZE <br/><span className="text-primary text-glow">RENTAL</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                You're just one step away from next-gen gaming. Fill out the details to generate your WhatsApp booking request.
              </p>
            </div>

            {selectedPackage ? (
              <div className="bg-card border border-primary/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,112,209,0.1)]">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Selected Package</h3>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedPackage.name}</h2>
                    <p className="text-sm text-gray-400">{selectedPackage.duration} Hours Session</p>
                  </div>
                  <div className="text-3xl font-display font-bold text-primary">
                    ₹{selectedPackage.price}
                  </div>
                </div>
                <div className="h-px bg-white/10 mb-4" />
                <ul className="space-y-2">
                  {selectedPackage.includedItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white/5 border border-dashed border-white/20 rounded-2xl p-8 text-center">
                <p className="text-muted-foreground mb-4">No package selected yet.</p>
                <a href="/packages" className="text-primary hover:underline font-bold">Browse Packages</a>
              </div>
            )}

            {/* Selected Games Preview */}
            {initialGameIds.length > 0 && games && (
              <div>
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Selected Games</h3>
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                  {games
                    .filter(g => initialGameIds.includes(g.id))
                    .map(game => (
                      <div key={game.id} className="w-20 flex-shrink-0">
                        <img src={game.imageUrl} alt={game.title} className="w-20 h-28 object-cover rounded-lg shadow-md border border-white/10" />
                        <p className="text-[10px] mt-2 text-center truncate">{game.title}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <h2 className="text-2xl font-bold mb-6 relative z-10">Delivery Details</h2>
            <BookingForm 
              packageId={initialPackageId} 
              gameIds={initialGameIds} 
              className="relative z-10" 
            />
          </motion.div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
