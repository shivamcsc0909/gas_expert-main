import { PhoneCall, Wrench, BadgeCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import { useBookingModal } from "@/context/BookingModalContext";

const steps = [
  {
    icon: PhoneCall,
    step: "01",
    title: "Book Service",
    desc: "Call us or fill our quick online form. We confirm your slot within 15 minutes.",
    color: "bg-blue-500",
  },
  {
    icon: Wrench,
    step: "02",
    title: "Technician Visits",
    desc: "Our certified expert arrives at your doorstep on time with all tools and spare parts.",
    color: "bg-accent",
  },
  {
    icon: BadgeCheck,
    step: "03",
    title: "Problem Solved",
    desc: "Your appliance is fixed safely and tested. Pay only when you are 100% satisfied.",
    color: "bg-emerald-500",
  },
];

export default function HowItWorks() {
  const { openModal } = useBookingModal();
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="how-it-works" className="py-10 sm:py-14 relative overflow-hidden">

      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#071f4e] via-[#0A66C2] to-[#0e4f9f]" />
      <div className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(circle,white 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block text-accent font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 bg-white/10 px-4 py-1.5 rounded-full text-white/80">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">How It Works</h2>
          <p className="text-white/65 text-base sm:text-lg">3 simple steps to get your gas appliance fixed today</p>
        </div>

        {/* Steps */}
        <div ref={ref} className="relative">

          {/* Connecting line — desktop */}
          <div className="hidden md:flex absolute top-14 left-0 right-0 items-center justify-center px-48 pointer-events-none">
            <div className="flex-1 h-0.5 bg-white/20 relative overflow-hidden">
              <div className={cn("absolute inset-0 h-full bg-accent/70 transition-all duration-1500 ease-out", isVisible ? "w-full" : "w-0")} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center text-center relative transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 250}ms` }}
              >
                {/* Mobile connector */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden absolute top-28 bottom-[-2.5rem] left-1/2 w-0.5 bg-white/15 -translate-x-1/2 z-0" />
                )}

                {/* Icon circle */}
                <div className="relative mb-6 z-10">
                  <div className="w-28 h-28 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl group hover:scale-105 transition-transform duration-300">
                    <step.icon className="w-11 h-11 text-white" />
                  </div>
                  {/* Step number */}
                  <div className={cn("absolute -top-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center shadow-lg", step.color)}>
                    <span className="text-white font-black text-sm">{step.step}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-accent text-white font-bold text-base shadow-[0_0_32px_rgba(255,122,0,0.4)] hover:shadow-[0_0_56px_rgba(255,122,0,0.7)] hover:-translate-y-[2px] transition-all duration-300"
          >
            Book Your Service Now
          </button>
          <p className="text-white/45 text-sm mt-3">No advance payment required • Pay after service</p>
        </div>

      </div>
    </section>
  );
}
