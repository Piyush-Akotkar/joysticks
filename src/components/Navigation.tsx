import { Link, useLocation } from "wouter";
import { Gamepad2, Home, Package, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/packages", label: "Packages", icon: Package },
    { href: "/games", label: "Games", icon: Gamepad2 },
    { href: "/book", label: "Rent Now", icon: CalendarClock },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Controller Icon Logo */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img
                src="/jsj-ps.png"
                alt="Controller Logo"
                className="w-8 h-8 object-contain"
              />
            </div>

            {/* Text Logo */}
            <div className="flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img
                src="/jsj-logo.png"
                alt="PS5 Rental Logo"
                className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,112,209,0.35)]"
              />
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={cn(
                    "px-6 py-2.5 rounded-full flex items-center gap-2 font-medium transition-all duration-300",
                    isActive 
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,112,209,0.15)]" 
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/book">
            <button className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5 active:translate-y-0">
              Book Now
            </button>
          </Link>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f0f12]/95 backdrop-blur-xl border-t border-white/10 pb-safe">
        <div className="flex items-center justify-around h-16 sm:h-20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full gap-1 active:scale-95 transition-transform",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-full transition-colors",
                  isActive && "bg-primary/10"
                )}>
                  <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      
      {/* Spacer for fixed header/footer */}
      <div className="hidden md:block h-20" />
      <div className="md:hidden h-4" /> 
    </>
  );
}
