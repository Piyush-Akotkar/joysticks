import { Navigation } from "@/components/Navigation";
import { STATIC_GAMES } from "@/lib/static-data";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Gamepad, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";

export default function Games() {
  useEffect(() => {
    document.title = "Games | Joysticks Joy";
  }, []);

  const games = STATIC_GAMES;
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(games.map(g => g.category) || []))];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || game.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-display font-bold mb-4"
            >
              GAME <span className="text-accent text-glow">LIBRARY</span>
            </motion.h1>
            <p className="text-muted-foreground">Select from our curated collection of PS5 hits.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search games..." 
                className="pl-9 bg-card border-white/10 w-full sm:w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-6 mb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all ${
                filter === cat 
                  ? "bg-accent text-white border-accent shadow-lg shadow-accent/20" 
                  : "bg-transparent border-white/10 text-muted-foreground hover:border-white/30 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredGames?.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-card rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img 
                  src={game.imageUrl} 
                  alt={game.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />

                {!game.isAvailable && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <span className="px-3 py-1 bg-red-500/20 text-red-500 border border-red-500/50 rounded text-xs font-bold uppercase">Unavailable</span>
                  </div>
                )}
              </div>
              
              <div className="p-3">
                <p className="text-[10px] text-accent font-bold uppercase tracking-wider mb-1">{game.category}</p>
                <h3 className="font-bold text-sm leading-tight truncate" title={game.title}>{game.title}</h3>
              </div>
            </motion.div>
          ))}

          {filteredGames?.length === 0 && (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              <Gamepad className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No games found matching your search.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
