import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import PageHero from "@/components/PageHero";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";
import { SITE_CONFIG } from "@/config";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

/* ── Brands we service ── */
const brands = [
  "Prestige", "Butterfly", "Sunflame", "Glen", "Elica",
  "Faber", "Hindware", "Bosch", "IFB", "Kaff",
  "Pigeon", "Wonderchef", "Inalsa", "Vidiem", "All Local Brands",
];

/* ── Pricing guide ── */
const pricing = [
  {
    service: "Gas Stove Repair (Basic)",
    range: "₹299 – ₹599",
    includes: ["Diagnosis & inspection", "Basic cleaning", "Minor adjustments"],
  },
  {
    service: "Burner Repair / Replacement",
    range: "₹99 – ₹499",
    includes: ["Burner cleaning", "Burner head replacement", "Flame test"],
  },
  {
    service: "Ignition Fix",
    range: "₹249 – ₹449",
    includes: ["Spark plug check", "Ignition wire repair", "Full ignition test"],
  },
  {
    service: "Gas Leakage Fix",
    range: "₹399 – ₹799",
    includes: ["Full leak detection", "Valve/pipe replacement", "Safety test"],
  },
  {
    service: "Annual Maintenance",
    range: "₹599 – ₹999",
    includes: ["Deep cleaning", "All parts check", "30-day warranty included"],
  },
  {
    service: "Copper Pipeline (per metre)",
    range: "₹150 – ₹250/m",
    includes: ["ISI-certified copper pipe", "Professional fitting", "Leak-proof testing"],
  },
];

function PricingSection() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section className="py-10 sm:py-14 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block text-accent font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 bg-accent/10 px-4 py-1.5 rounded-full">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
            Service Price Guide
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Approximate pricing for common repairs. Final cost is quoted after inspection — no hidden charges.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pricing.map((item, i) => (
            <div
              key={i}
              className={cn(
                "bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md hover:border-primary/20 hover:-translate-y-1 transition-all duration-300",
                isVisible ? "reveal-visible" : "reveal-hidden"
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="font-bold text-foreground text-base leading-snug">{item.service}</h3>
                <span className="text-accent font-black text-base whitespace-nowrap flex-shrink-0">{item.range}</span>
              </div>
              <ul className="space-y-2">
                {item.includes.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          * Prices are indicative. Actual cost depends on the brand, model, and parts required.
          A visit charge of ₹200 is waived off when you proceed with the repair.
        </p>
      </div>
    </section>
  );
}

function BrandsSection() {
  return (
    <section className="py-16 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-muted-foreground text-sm font-semibold uppercase tracking-wider mb-6">
          Brands We Service
        </p>
        {/*
         * 📸 OPTIONAL: Replace text pills with actual brand logos
         * Place logo images in: public/images/brands/
         * e.g. public/images/brands/prestige.png, butterfly.png, etc.
         * Recommended size: 80×40px PNG with transparent background
         */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          {brands.map((brand) => (
            <span
              key={brand}
              className="px-4 py-2 bg-muted rounded-xl text-sm font-semibold text-foreground/70 border border-border hover:border-primary/30 hover:text-primary transition-colors"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const { openModal } = useBookingModal();
  return (
    <div className="relative w-full">
      <Navbar />
      <PageHero
        breadcrumb="What We Offer"
        title="Our Repair Services"
        subtitle="Expert gas stove, hob, and cooking range repair services in Bengaluru. Certified technicians, same-day visits, and 30-day service guarantee on every job."
      />

      <BrandsSection />
      <Services />
      <PricingSection />
      <WhyChooseUs />

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-[#071f4e] to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Ready to Book a Repair Today?
          </h2>
          <p className="text-white/70 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Our certified technician will be at your doorstep within 60–90 minutes. Pay only after the job is done.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-accent text-white font-bold text-base shadow-lg shadow-accent/40 hover:shadow-accent/70 hover:-translate-y-1 transition-all duration-300"
            >
              Book Service Now <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href={`tel:+${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 border border-white/25 text-white font-bold text-base hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              Call: {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButton />
    </div>
  );
}
