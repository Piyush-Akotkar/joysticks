import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Send, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { STATIC_PACKAGES, STATIC_GAMES } from "@/lib/static-data";

interface BookingFormProps {
  packageId?: number;
  gameIds?: number[];
  className?: string;
}

interface InsertBooking {
  customerName: string;
  location: string;
  packageId: number;
  gameIds: number[];
  preferredDate?: Date;
}

// GTA VI game id
const GTA6_GAME_ID = 0;

// Packages whose name includes "GTA VI" are GTA 6 packages
function isGta6Package(pkg: { name: string } | undefined): boolean {
  return !!pkg && pkg.name.includes("GTA VI");
}

export function BookingForm({
  packageId,
  gameIds = [],
  className,
}: BookingFormProps) {
  const { toast } = useToast();
  const [redirecting, setRedirecting] = useState(false);

  const selectedPackage = STATIC_PACKAGES.find((p) => p.id === packageId);
  const isGta6 = isGta6Package(selectedPackage);

  // For GTA 6 packages: always pre-include GTA VI; for others: exclude it from initial selection
  const initialGames = isGta6
    ? Array.from(new Set([GTA6_GAME_ID, ...gameIds]))
    : gameIds.filter((id) => id !== GTA6_GAME_ID);

  const [selectedGames, setSelectedGames] = useState<number[]>(initialGames);

  const maxGames = selectedPackage?.maxGamesAllowed || 0;

  const canAddMoreGames = selectedGames.length < maxGames;

  // Games available for selection depending on package type
  const availableGames = isGta6
    ? STATIC_GAMES
    : STATIC_GAMES.filter((g) => g.id !== GTA6_GAME_ID);

  const form = useForm<InsertBooking>({
    defaultValues: {
      customerName: "",
      location: "",
      packageId: packageId || 0,
      gameIds: gameIds,
      preferredDate: undefined,
    },
  });

  useEffect(() => {
    form.setValue("gameIds", selectedGames);
  }, [selectedGames, form]);

  useEffect(() => {
    if (selectedGames.length > maxGames) {
      setSelectedGames(selectedGames.slice(0, maxGames));
    }
  }, [maxGames]);

  function toggleGame(gameId: number) {
    // GTA VI is locked for GTA 6 packages — cannot be deselected
    if (isGta6 && gameId === GTA6_GAME_ID) return;

    setSelectedGames((prev) => {
      if (prev.includes(gameId)) {
        return prev.filter((id) => id !== gameId);
      } else {
        if (prev.length >= maxGames) {
          toast({
            title: "Game Limit Reached",
            description: `You can select maximum ${maxGames} ${
              maxGames === 1 ? "game" : "games"
            } with this package.`,
            variant: "destructive",
          });
          return prev;
        }

        return [...prev, gameId];
      }
    });
  }

  async function onSubmit(data: InsertBooking) {
    if (!data.customerName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return;
    }

    if (!data.location.trim()) {
      toast({
        title: "Address required",
        description: "Please enter your delivery address.",
        variant: "destructive",
      });
      return;
    }

    if (!data.packageId) {
      toast({
        title: "No package selected",
        description: "Please select a rental package first.",
        variant: "destructive",
      });
      return;
    }

    const selectedPackageName =
      STATIC_PACKAGES.find((p) => p.id === data.packageId)?.name || "Package";

    const selectedGameNames = selectedGames
      .map((gId) => STATIC_GAMES.find((g) => g.id === gId)?.title)
      .filter(Boolean)
      .join(", ");

    const message = `
    Hi! I'd like to book a PS5 rental.

    *Package:* ${selectedPackageName}
    *Name:* ${data.customerName}
    *Address:* ${data.location}
    ${data.preferredDate ? `*Preferred Date:* ${format(data.preferredDate, "PPP")}` : ""}
    ${selectedGameNames ? `*Games:* ${selectedGameNames}` : ""}

    Please confirm availability and send invoice.
    `.trim();

    const phoneNumber = "7276952437"; 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    try {
      setRedirecting(true);

      toast({
        title: "Booking Initiated!",
        description:
          "Redirecting you to WhatsApp to finalize details...",
      });

      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        {/* Pune Delivery Note */}
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
          <p className="text-sm text-accent font-medium">
            ✓ Rental available in Pune city only - 2-hour doorstep delivery
          </p>
        </div>

        {/* Full Name */}
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  value={field.value ?? ""}
                  className="bg-white/5 border-white/10 focus:border-primary h-12 rounded-xl text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preferred Date */}
        <FormField
          control={form.control}
          name="preferredDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-white">
                Preferred Rental Date
              </FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal bg-white/5 border-white/10 h-12 rounded-xl",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}

                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent
                  className="w-auto p-0 bg-card border-white/10"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value ?? undefined}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() ||
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                    className="bg-card text-white"
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                Delivery Address
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Street, Area, City"
                  {...field}
                  value={field.value ?? ""}
                  className="bg-white/5 border-white/10 focus:border-primary h-12 rounded-xl text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Games Selection */}
        {selectedPackage && maxGames > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel className="text-white text-base">
                Select Games ({selectedGames.length}/{maxGames})
              </FormLabel>
            </div>

            <p className="text-xs text-muted-foreground">
              Choose up to {maxGames} game{maxGames === 1 ? "" : "s"} included in your package.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2">
              {availableGames.map((game) => {
                const isSelected = selectedGames.includes(game.id);
                const isLocked = isGta6 && game.id === GTA6_GAME_ID;
                const isDisabled = (!isSelected && !canAddMoreGames) || isLocked;

                return (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() => toggleGame(game.id)}
                    disabled={isDisabled}
                    className={cn(
                      "relative rounded-2xl overflow-hidden border transition-all duration-300 group text-left",
                      isSelected
                        ? "border-primary ring-2 ring-primary shadow-[0_0_20px_rgba(0,112,209,0.35)] scale-[1.02]"
                        : "border-white/10 hover:border-primary/40",
                      !isLocked && isDisabled && "opacity-40 cursor-not-allowed",
                      isLocked && "cursor-default"
                    )}
                  >
                    {/* Game Image */}
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={game.imageUrl}
                        alt={game.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                      {/* Checkbox / Lock */}
                      <div
                        className={cn(
                          "absolute top-3 right-3 w-7 h-7 rounded-full border flex items-center justify-center backdrop-blur-md transition-all",
                          isSelected
                            ? "bg-primary border-primary"
                            : "bg-black/40 border-white/30"
                        )}
                      >
                        {isLocked ? (
                          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                          </svg>
                        ) : isSelected ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : null}
                      </div>

                      {/* Availability Badge */}
                      {!game.isAvailable && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">
                            Unavailable
                          </span>
                        </div>
                      )}

                      {/* Locked badge for GTA VI */}
                      {isLocked && (
                        <div className="absolute bottom-12 left-3">
                          <span className="px-2 py-0.5 rounded-full bg-primary/30 text-primary text-[9px] font-bold border border-primary/40 uppercase tracking-wider">
                            Included
                          </span>
                        </div>
                      )}

                      {/* Text */}
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-[10px] text-accent font-bold uppercase tracking-wider">
                          {game.category}
                        </p>
                        <p className="text-sm font-bold text-white leading-tight">
                          {game.title}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Games Pills */}
            {selectedGames.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedGames.map((gameId) => {
                  const game = STATIC_GAMES.find((g) => g.id === gameId);
                  if (!game) return null;
                  const isLockedPill = isGta6 && gameId === GTA6_GAME_ID;

                  return (
                    <button
                      key={gameId}
                      type="button"
                      onClick={() => !isLockedPill && toggleGame(gameId)}
                      disabled={isLockedPill}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors",
                        isLockedPill
                          ? "bg-primary/25 border-primary/50 cursor-default"
                          : "bg-primary/15 border-primary/30 hover:bg-primary/25"
                      )}
                    >
                      <span className="text-xs font-medium text-white">
                        {game.title}
                      </span>
                      {isLockedPill ? (
                        <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-primary font-bold">×</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
        

        {/* CTA */}
        <Button
          type="submit"
          disabled={redirecting}
          className="w-full h-14 text-lg font-bold uppercase tracking-wider bg-primary hover:bg-primary/90 text-white rounded-xl"
        >
          {redirecting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Redirecting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Confirm via WhatsApp
              <Send className="w-5 h-5" />
            </span>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-4">
          By clicking confirm, you will be redirected to WhatsApp
          to send your booking details directly to our team.
        </p>
      </form>
    </Form>
  );
}