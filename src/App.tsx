import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Packages from "@/pages/Packages";
import Games from "@/pages/Games";
import Book from "@/pages/Book";
import { queryClient } from "./lib/queryClient";
import { useState } from "react";
import { SplashScreen } from "./components/SplashScreen";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RentalGuidelines from "./pages/RentalGuidelines";
import { ScrollToTop } from "@/components/ScrollToTop";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/packages" component={Packages} />
      <Route path="/games" component={Games} />
      <Route path="/book" component={Book} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-conditions" component={TermsConditions} />
      <Route path="/rental-guidelines" component={RentalGuidelines} />
      <Route component={NotFound} />
    </Switch>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/7276952437"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-[calc(4rem+1.5rem)] md:bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
      style={{ backgroundColor: "#25D366" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        className="w-7 h-7"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.571a.75.75 0 0 0 .92.92l5.733-1.474A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.727 9.727 0 0 1-4.964-1.361l-.356-.212-3.685.947.973-3.567-.232-.368A9.724 9.724 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
      </svg>
    </a>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // Only show splash on first visit per session
    return !sessionStorage.getItem("splashShown");
  });

  function handleSplashComplete() {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        <ScrollToTop />
        <Router />
        <Toaster />
        <WhatsAppButton />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
