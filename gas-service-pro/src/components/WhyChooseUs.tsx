import { Clock, Users, IndianRupee, ShieldCheck, Home, Star, CheckCircle2, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import { useBookingModal } from "@/context/BookingModalContext";

const features = [
  { icon: Clock,       title: "Same Day Service",   desc: "Book today, get it fixed today. We respect your time." },
  { icon: Users,       title: "Expert Technicians", desc: "Certified, background-verified, and experienced pros." },
  { icon: IndianRupee, title: "Affordable Pricing",  desc: "Upfront quotes. No hidden charges, ever." },
  { icon: ShieldCheck, title: "30-Day Warranty",     desc: "All repairs covered with genuine spare parts." },
  { icon: Home,        title: "Doorstep Service",    desc: "We come to you — no need to carry your appliance." },
  { icon: Star,        title: "4.9★ Rated Service",  desc: "Trusted by 1,200+ families in Bengaluru." },
];

const stats = [
  { value: "1,200+", label: "Happy Customers" },
  { value: "4.9 ★",  label: "Average Rating"  },
  { value: "30 Day", label: "Repair Warranty" },
  { value: "60 Min", label: "Arrival Time"    },
];

export default function WhyChooseUs() {
  const { openModal } = useBookingModal();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-12 sm:py-16 bg-muted relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* LEFT: Visual stats panel (no image needed) */}
          <div className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          )}>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#071f4e] via-primary to-[#0e4f9f] p-7 sm:p-8 text-white shadow-2xl">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-accent/15 rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />

              <div className="relative z-10">
                <p className="text-accent font-bold uppercase tracking-wider text-xs mb-2">Why Gasxpert</p>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-6 leading-snug">
                  Bengaluru's Most Trusted<br />Gas Repair Experts
                </h3>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 mb-7">
                  {stats.map(({ value, label }) => (
                    <div key={label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 text-center border border-white/10">
                      <p className="text-2xl font-black text-white leading-none">{value}</p>
                      <p className="text-white/65 text-xs mt-1.5 font-medium">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Trust points */}
                <div className="space-y-2.5">
                  {[
                    "Certified & background-verified technicians",
                    "Only ISI-certified & genuine spare parts used",
                    "No-Fix, No-Fee — pay only after repair",
                    "Available every day 8 AM – 9 PM",
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-2.5 text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Heading + feature cards */}
          <div ref={ref}>
            <span className="inline-block text-accent font-bold tracking-wider uppercase text-xs mb-2.5 bg-accent/10 px-4 py-1.5 rounded-full">
              Why Choose Us
            </span>
            <h2 className={cn(
              "text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-4 leading-tight transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              The Most Reliable Repair Service in Bengaluru
            </h2>
            <p className={cn(
              "text-sm sm:text-base text-muted-foreground mb-6 transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              A broken gas stove shouldn't disrupt your family's meals. We provide fast, professional, and safe repair services right at your doorstep.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {features.map((f, i) => (
                <div
                  key={i}
                  className={cn(
                    "bg-card p-4 rounded-xl border border-border/60 shadow-sm flex items-start gap-3",
                    "hover:shadow-md hover:border-primary/20 transition-all duration-300",
                    isVisible ? "reveal-visible" : "reveal-hidden"
                  )}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-0.5">{f.title}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-bold text-sm hover:bg-primary hover:text-white transition-all duration-300"
            >
              Book an Expert <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
