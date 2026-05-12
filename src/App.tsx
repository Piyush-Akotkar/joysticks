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
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
