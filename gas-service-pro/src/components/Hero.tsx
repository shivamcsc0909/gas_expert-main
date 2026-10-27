import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowRight, Phone, Star, ShieldCheck,
  CheckCircle2, Clock, Users,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookingModal } from "@/context/BookingModalContext";
import { SITE_CONFIG } from "@/config";

const STATS = [
  { icon: Users,       value: "1,200+", label: "Happy Customers" },
  { icon: Star,        value: "4.9 / 5", label: "Avg. Rating"     },
  { icon: Clock,       value: "30 Min",  label: "Response Time"   },
  { icon: ShieldCheck, value: "30 Days", label: "Warranty"         },
];

const SERVICES_TICKER = [
  "Gas Stove Repair",
  "Burner Cleaning",
  "Ignition Fix",
  "Gas Leak Detection",
  "Hob Repair",
  "Annual Maintenance",
  "Cooking Range Service",
  "Copper Pipeline Installation",
  "Auto-Ignition Replacement",
];

const SLIDES = [
  {
    image: "/hero-gas-stove-repair.jpg",
    alt: "Indian gas stove repair by professional technician",
  },
  {
    image: "/hero-burner-repair.jpg",
    alt: "Gas burner cleaning and repair",
  },
  {
    image: "/hero-ignition-fix.jpg",
    alt: "Auto ignition replacement and repair",
  },
  {
    image: "/hero-gas-leakage-fix.jpg",
    alt: "Gas leakage detection and fix — LPG cylinder",
  },
  {
    image: "/hero-copper-pipeline.jpg",
    alt: "Copper gas pipeline installation in Indian kitchen",
  },
];

export default function Hero() {
  const { openModal } = useBookingModal();
  const [current, setCurrent] = useState(0);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5000);
  }, []);

  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startTimer]);

  const handlePrev = () => { setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length); startTimer(); };
  const handleNext = () => { setCurrent((c) => (c + 1) % SLIDES.length); startTimer(); };

  /* Ticker pause on hover */
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    const pause  = () => el.style.animationPlayState = "paused";
    const resume = () => el.style.animationPlayState = "running";
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    return () => { el.removeEventListener("mouseenter", pause); el.removeEventListener("mouseleave", resume); };
  }, []);

  return (
    <section id="home" className="relative h-[100svh] flex flex-col overflow-hidden">

      {/* ── Background slides (full bleed, only images change) ── */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <img
            src={s.image}
            alt={s.alt}
            className={cn("w-full h-full object-cover", i === current && "ken-burns")}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 z-20 hidden sm:block bg-gradient-to-r from-black/85 via-black/55 to-black/15 pointer-events-none" />
      <div className="absolute inset-0 z-20 sm:hidden bg-black/60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 z-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-28 z-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

      {/* ── FIXED TEXT — never changes with slides ── */}
      <div className="relative z-30 flex-1 flex items-center pt-24 sm:pt-28 min-h-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-full sm:max-w-lg lg:max-w-2xl text-center sm:text-left">

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4 animate-fade-in-up" style={{ animationFillMode: "both" }}>
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inset-0 rounded-full bg-accent opacity-80" />
                <span className="relative rounded-full h-2 w-2 bg-accent" />
              </span>
              Same Day Service — {SITE_CONFIG.serviceArea}
            </div>

            {/* Main headline */}
            <h1 className="font-black tracking-tight leading-[1.08] text-white mb-3 sm:mb-5 animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
              <span className="block text-[2.2rem] xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl drop-shadow-lg">
                Gas Stove Repair
              </span>
              <span className="block text-[2.2rem] xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-[#FF7A00] to-amber-400 hero-text-glow mt-0.5">
                At Your Doorstep
              </span>
            </h1>

            {/* Sub */}
            <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed mb-5 sm:mb-7 animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
              Fast, affordable and certified technicians for all gas stove,
              hob &amp; cooking range issues — fixed right the first time.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-3 mb-5 sm:mb-7 animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
              <button onClick={openModal} className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white text-sm sm:text-base bg-accent shadow-[0_0_32px_rgba(255,122,0,0.55)] hover:shadow-[0_0_56px_rgba(255,122,0,0.8)] hover:-translate-y-[2px] transition-all duration-300 w-full sm:w-auto">
                <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-[#FF7A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">Book Service Now</span>
                <ArrowRight className="relative w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <a href={`tel:+${SITE_CONFIG.phoneRaw}`} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white text-sm sm:text-base border-2 border-white/35 bg-white/10 backdrop-blur-md hover:bg-white/25 hover:border-white/60 hover:-translate-y-[2px] transition-all duration-300 w-full sm:w-auto">
                <Phone className="w-4 h-4 flex-shrink-0" />
                {SITE_CONFIG.phone}
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm font-medium text-white/80 animate-fade-in-up" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
              {["Certified Technicians", "No-Fix No-Fee", "Transparent Pricing", "All Brands Covered"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Slide controls (prev / next / dots) ── */}
      <div className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-3">
        <div className="flex items-center gap-2">
          <button onClick={handlePrev} aria-label="Previous" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button onClick={handleNext} aria-label="Next" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); startTimer(); }}
              aria-label={`Slide ${i + 1}`}
              className={cn("h-1.5 rounded-full transition-all duration-300", i === current ? "w-6 bg-accent" : "w-1.5 bg-white/40 hover:bg-white/70")}
            />
          ))}
        </div>

        <span className="text-white/50 text-xs font-semibold tabular-nums hidden sm:block">
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Stats bar ── */}
      <div className="relative z-30 w-full border-t border-white/10 bg-black/35 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 divide-x divide-white/10">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2 py-3 sm:py-4 px-2 sm:px-5 first:pl-0 last:pr-0">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-black text-sm sm:text-base leading-none">{value}</p>
                  <p className="text-white/55 text-[9px] sm:text-[11px] font-medium mt-0.5 truncate">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services ticker ── */}
      <div className="relative z-30 w-full bg-accent py-2 overflow-hidden">
        <div
          ref={tickerRef}
          className="flex gap-0 whitespace-nowrap"
          style={{ animation: "ticker 30s linear infinite" }}
        >
          {[...SERVICES_TICKER, ...SERVICES_TICKER].map((s, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-5 sm:px-8">
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/60 flex-shrink-0" />
              {s}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
