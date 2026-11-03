import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Check, Calendar, Clock } from "lucide-react";
import { STATIC_PACKAGES, STATIC_GAMES } from "@/lib/static-data";
import { Footer } from "@/components/Footer";

// GTA VI Launch Date - November 19, 2026
const GTA_VI_LAUNCH_DATE = new Date("2026-11-19T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const difference = GTA_VI_LAUNCH_DATE.getTime() - now.getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const isPreBookingOpen = !timeLeft.isExpired;
  
  // Filter packages: pre-launch (ids 1-5) vs post-launch (ids 101-105)
  const gtaPackages = isPreBookingOpen 
    ? STATIC_PACKAGES.filter(p => p.id <= 5)
    : STATIC_PACKAGES.filter(p => p.id > 100);
  
  const regularPackages = STATIC_PACKAGES.filter(p => p.id > 5 && p.id <= 100);
  const packages = [...gtaPackages, ...regularPackages];
  const games = STATIC_GAMES;

  // Show only first 3 games/packages as preview
  const featuredPackages = packages.slice(0, 3);
  const featuredGames = games.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0">
      <Navigation />

      {/* Hero Section - GTA 6 Banner */}
      <section className="relative min-h-[85vh] md:min-h-[85vh] flex items-center overflow-hidden py-12 md:py-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
          <img
            src="/banner-gta-6.webp"
            alt="GTA VI Banner"
            className="w-full h-full object-cover object-top opacity-80"
          />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm uppercase tracking-widest mb-4 backdrop-blur-md">
              <Calendar className="w-4 h-4" />
              Pre-bookings Open
            </div>

            {!timeLeft.isExpired && (
              <div className="flex flex-wrap items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/40 text-accent font-bold text-sm mb-6 backdrop-blur-md w-fit">
                <Clock className="w-4 h-4" />
                <span>Launching 19 Nov 2026 in:</span>
                <span className="text-white">{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
              </div>
            )}

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] text-white mb-6">
              ENTER THE <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 text-glow">WORLD OF</span> <br/>
              VICE CITY
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-xl leading-relaxed">
              The wait is almost over. Your next gaming adventure starts here.
            </p>

            <p className="text-lg text-gray-400 mb-10 max-w-xl">
              GTA VI is coming to Joysticks Joy! Experience the next generation of open-world gaming on PS5.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/packages">
                <Button className="h-14 px-8 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(0,112,209,0.4)] hover:shadow-[0_0_40px_rgba(0,112,209,0.6)] hover:-translate-y-1 transition-all duration-300">
                  Explore GTA VI Packages <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              {isPreBookingOpen && (
                <Link href="/book">
                  <Button variant="outline" className="h-14 px-8 text-lg font-bold rounded-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all">
                    PRE-BOOK NOW
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 max-w-7xl container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            POPULAR <span className="text-primary">PLANS</span>
          </h2>

          <Link
            href="/packages"
            className="hidden md:flex items-center text-muted-foreground hover:text-white transition-colors"
          >
            View All <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {featuredPackages?.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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

              {/* Large Number */}
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

                  <p className="text-sm text-muted-foreground mt-1">
                    {pkg.duration}
                  </p>

                  <p className="text-xs text-green-400 font-semibold mt-2">
                    Deposit: ₹{pkg.deposit}
                  </p>
                </div>

                {/* Controllers */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-white">
                    {pkg.controllers}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {pkg.extraController}
                  </p>
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
              <Link
                href={`/book?packageId=${pkg.id}`}
                className="relative z-10 mt-auto"
              >
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

        <div className="mt-8 text-center md:hidden">
          <Link href="/packages">
            <Button variant="ghost" className="text-muted-foreground">
              View All Packages
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-20 bg-white/2 ">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <h2 className="text-2xl md:text-5xl font-display font-bold">TOP <span className="text-accent">GAMES</span></h2>
            <Link href="/games" className="hidden md:flex items-center text-muted-foreground hover:text-white transition-colors">
              View All <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {featuredGames?.map((game, i) => (
              <motion.div 
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-primary/20"
              >
                <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider mb-1 block">{game.category}</span>
                  <h4 className="text-lg leading-tight text-white group-hover:text-primary transition-colors">{game.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/games">
              <Button variant="ghost" className="text-muted-foreground">Browse Library</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
