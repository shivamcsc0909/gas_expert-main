import { MapPin, Clock, Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

const areas = [
  "Koramangala", "Indiranagar", "Whitefield", "HSR Layout",
  "Jayanagar", "Electronic City", "Marathahalli", "BTM Layout",
  "JP Nagar", "Bellandur", "Hebbal", "Yelahanka",
];

const highlights = [
  { icon: Zap,   text: "30 Min Response" },
  { icon: Clock, text: "8 AM – 9 PM Daily" },
  { icon: MapPin, text: "All Bengaluru Zones" },
];

export default function ServiceArea() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-10 sm:py-14 bg-muted relative overflow-hidden">
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-3xl overflow-hidden shadow-xl border border-border/50">
          <div className="grid lg:grid-cols-2">

            {/* ── LEFT: Content ── */}
            <div ref={ref} className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
              <div className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                  <MapPin className="w-4 h-4" />
                  Coverage Area
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-5 leading-tight">
                  Serving All of{" "}
                  <span className="text-primary">Bengaluru</span>
                </h2>

                <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
                  Our network of certified technicians covers all major areas of Bengaluru.
                  Wherever you live, we guarantee fast response and doorstep service.
                </p>

                {/* Highlight pills */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {highlights.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 bg-primary/8 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                      <Icon className="w-4 h-4" />
                      {text}
                    </div>
                  ))}
                </div>

                {/* Area grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                  {areas.map((area) => (
                    <div key={area} className="flex items-center gap-2 text-foreground font-medium text-sm">
                      <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Google Map ── */}
            <div className={cn(
              "relative min-h-[320px] sm:min-h-[400px] lg:min-h-0 transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <iframe
                title="Gasxpert Coverage Area — Bengaluru"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.88653909217!2d77.49085444999999!3d12.953959999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full absolute inset-0 border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
