import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "flicker" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("flicker"), 1000);
    const t2 = setTimeout(() => setPhase("exit"), 3000);
    const t3 = setTimeout(() => onComplete(), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07070a] overflow-hidden"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        >
          {/* Scanline overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.25) 3px, rgba(0,0,0,0.25) 4px)",
            }}
          />

          {/* Radial blue glow */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 600,
              height: 600,
              background: "radial-gradient(circle, rgba(0,112,209,0.18) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />

          {/* Controller image */}
          <motion.img
            src='/jsj-ps.png'
            alt="Controller"
            className="relative z-20 w-44 md:w-56 drop-shadow-[0_0_30px_rgba(0,200,255,0.5)]"
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "backOut" }}
          />

          {/* Logo image with flicker */}
          <motion.div
            className="relative z-20 mt-6 w-72 md:w-96"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <FlickerLogo active={phase === "flicker"} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="relative z-20 mt-4 text-[#0070d1] text-xs md:text-sm tracking-[0.45em] uppercase font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            PS5 Rental · Pune
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-10 w-36 h-[2px] bg-white/10 rounded-full overflow-hidden z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#0070d1] to-cyan-400 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.6, ease: "linear", delay: 0.3 }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FlickerLogo({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!active) {
      setVisible(true);
      return;
    }

    // Flicker sequence: rapid show/hide
    const sequence = [
      { v: false, t: 0 },
      { v: true,  t: 80 },
      { v: false, t: 140 },
      { v: true,  t: 200 },
      { v: false, t: 240 },
      { v: true,  t: 310 },
      { v: false, t: 370 },
      { v: true,  t: 400 },
      { v: false, t: 460 },
      { v: true,  t: 520 },
      { v: false, t: 540 },
      { v: true,  t: 600 },
      { v: false, t: 640 },
      { v: true,  t: 680 },
    ];

    const timers = sequence.map(({ v, t }) =>
      setTimeout(() => setVisible(v), t)
    );
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return (
    <div className="relative">
      {/* Glow layer underneath */}
      <img
        src='/jsj-logo.png'
        alt="JOYSTICKS JOY"
        className="w-full select-none pointer-events-none absolute inset-0"
        style={{
          filter: "blur(10px) brightness(2)",
          opacity: visible ? 0.5 : 0,
          transition: "opacity 0.03s",
        }}
        draggable={false}
      />
      {/* Main logo */}
      <img
        src='/jsj-logo.png'
        alt="JOYSTICKS JOY"
        className="w-full select-none pointer-events-none relative"
        style={{
          opacity: visible ? 1 : 0,
          filter: visible
            ? "drop-shadow(0 0 12px rgba(0,180,255,0.7)) drop-shadow(0 0 30px rgba(0,112,209,0.4))"
            : "none",
          transition: "opacity 0.03s, filter 0.03s",
          mixBlendMode: "screen",
        }}
        draggable={false}
      />
    </div>
  );
}
