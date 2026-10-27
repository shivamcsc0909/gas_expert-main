import { Flame, Activity, Zap, ShieldAlert, LayoutGrid, Wrench, Cable, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import { useBookingModal } from "@/context/BookingModalContext";

const services = [
  {
    icon: Flame,
    title: "Gas Stove Repair",
    description: "Complete diagnosis and repair for all brands — Prestige, Butterfly, Sunflame, Elica. Fix low flame, uneven burning, and more.",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "hover:border-orange-200",
    /*
     * 📸 IMAGE: Service card thumbnail (optional)
     * Type: Close-up of a gas stove being repaired / technician holding tools near stove
     * Size: 400x250px recommended
     * File: public/images/service-gas-stove.jpg
     */
  },
  {
    icon: Activity,
    title: "Burner Repair & Cleaning",
    description: "Deep cleaning and repair of clogged or damaged burners. Restore full flame power and even heat distribution.",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "hover:border-blue-200",
    /*
     * 📸 IMAGE: Close-up of a gas burner with blue flame
     * File: public/images/service-burner.jpg
     */
  },
  {
    icon: Zap,
    title: "Ignition Fix",
    description: "Repair of faulty auto-ignition systems, spark plugs, and annoying continuous clicking issues — all brands.",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    border: "hover:border-yellow-200",
    /*
     * 📸 IMAGE: Spark ignition close-up on gas stove
     * File: public/images/service-ignition.jpg
     */
  },
  {
    icon: ShieldAlert,
    title: "Gas Leakage Fix",
    description: "Emergency response for gas smell. We check all valves, LPG pipes, and cylinder connections for 100% safety.",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "hover:border-red-200",
    /*
     * 📸 IMAGE: Technician using gas leak detector near cylinder/pipe
     * File: public/images/service-gas-leak.jpg
     */
  },
  {
    icon: LayoutGrid,
    title: "Built-in Hob Repair",
    description: "Specialized repair for modern built-in glass hobs and premium cooking ranges of all brands.",
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "hover:border-purple-200",
    /*
     * 📸 IMAGE: Modern built-in glass hob in a kitchen
     * File: public/images/service-hob.jpg
     */
  },
  {
    icon: Wrench,
    title: "Annual Maintenance",
    description: "Comprehensive deep cleaning and full servicing to extend the life of your kitchen appliances.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "hover:border-emerald-200",
    /*
     * 📸 IMAGE: Technician doing full servicing of a gas stove
     * File: public/images/service-maintenance.jpg
     */
  },
  {
    icon: Cable,
    title: "Copper Gas Pipeline Installation",
    description: "Professional copper gas pipeline installation for homes and commercial kitchens. Safe, durable, and 100% leak-proof connections.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "hover:border-amber-200",
    /*
     * 📸 IMAGE: Technician installing copper gas pipes in a kitchen wall
     * File: public/images/service-copper-pipeline.jpg
     */
  },
];

export default function Services() {
  const { openModal } = useBookingModal();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="services" className="py-10 sm:py-14 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-block text-accent font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 bg-accent/10 px-4 py-1.5 rounded-full">What We Do</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-5">Our Services</h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            From minor fixes to major repairs — certified experts handle everything
            with precision and your safety as our top priority.
          </p>
        </div>

        {/* Service cards grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service, index) => {
            const isLast = index === services.length - 1;
            return (
              <div
                key={index}
                className={cn(
                  "bg-card rounded-2xl p-6 sm:p-7 border border-border shadow-sm",
                  "hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 ease-out group relative overflow-hidden",
                  service.border,
                  isLast ? "sm:col-span-2 lg:col-span-1" : "",
                  isVisible ? "reveal-visible" : "reveal-hidden"
                )}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className={cn("w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-5", service.bg)}>
                    <service.icon className={cn("w-6 h-6 sm:w-7 sm:h-7", service.color)} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2.5">{service.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-accent text-white font-bold text-base shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-[2px] transition-all duration-300"
          >
            Book a Service Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
