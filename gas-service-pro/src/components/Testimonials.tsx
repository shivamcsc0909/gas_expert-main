import { Star, Quote } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Koramangala, Bengaluru",
    text: "Excellent service! The technician arrived within an hour. Fixed our gas leak issue perfectly and the charges were very reasonable. Highly recommended!",
    rating: 5,
    initial: "P",
    color: "bg-blue-500",
    service: "Gas Leakage Fix",
  },
  {
    name: "Rahul Reddy",
    location: "Indiranagar, Bengaluru",
    text: "My built-in hob's auto-ignition had stopped working for months. Gasxpert fixed it in just 20 minutes. Very professional and courteous behavior.",
    rating: 5,
    initial: "R",
    color: "bg-orange-500",
    service: "Ignition Fix",
  },
  {
    name: "Anjali Desai",
    location: "Whitefield, Bengaluru",
    text: "Very neat and clean work. They explained the problem clearly before starting the repair. No hidden charges — paid exactly what was quoted. Will call again!",
    rating: 5,
    initial: "A",
    color: "bg-emerald-500",
    service: "Gas Stove Repair",
  },
  {
    name: "Vikram Kumar",
    location: "HSR Layout, Bengaluru",
    text: "Honest service with no upselling of unnecessary parts. The stove is working perfectly now. Great warranty too — they even called to check after 2 weeks.",
    rating: 5,
    initial: "V",
    color: "bg-purple-500",
    service: "Burner Repair",
  },
  {
    name: "Sunita Patel",
    location: "Jayanagar, Bengaluru",
    text: "Got copper gas pipeline installed for our new kitchen. Work was very clean, no mess left behind. Technician was knowledgeable and completed in one visit.",
    rating: 5,
    initial: "S",
    color: "bg-amber-500",
    service: "Pipeline Installation",
  },
  {
    name: "Mohan Rao",
    location: "Electronic City, Bengaluru",
    text: "Low flame problem on all 4 burners — Gasxpert fixed it same day. Very fast, affordable, and professional. The annual maintenance package is great value.",
    rating: 5,
    initial: "M",
    color: "bg-rose-500",
    service: "Annual Maintenance",
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-10 sm:py-14 bg-muted relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block text-accent font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 bg-accent/10 px-4 py-1.5 rounded-full">
            Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Loved by Bengaluru Families
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Over 1,200+ happy customers across Bengaluru trust us for their gas appliance needs.
          </p>
          {/* Star summary */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
            <span className="font-bold text-foreground ml-1">4.9/5</span>
            <span className="text-muted-foreground text-sm">based on 1,200+ reviews</span>
          </div>
        </div>

        {/* Cards grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={cn(
                "bg-card rounded-2xl p-6 border border-border shadow-sm",
                "hover:-translate-y-1 hover:shadow-lg transition-all duration-300",
                isVisible ? "reveal-visible" : "reveal-hidden"
              )}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-accent/30 mb-3 fill-accent/10" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed mb-5">
                "{t.text}"
              </p>

              {/* Divider */}
              <div className="border-t border-border pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0", t.color)}>
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm leading-none">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.location}</p>
                  </div>
                </div>
                {/* Service tag */}
                <span className="text-[10px] font-semibold bg-accent/10 text-accent px-2.5 py-1 rounded-full flex-shrink-0">
                  {t.service}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
