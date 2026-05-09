import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground">
      <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>
      <h1 className="text-5xl font-display font-bold mb-4">404</h1>
      <p className="text-muted-foreground text-lg mb-8 text-center max-w-md">
        Game Over. The page you are looking for has been moved or deleted.
      </p>

      <Link href="/">
        <Button className="bg-primary hover:bg-primary/90 text-white px-8 h-12 rounded-full font-bold">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
