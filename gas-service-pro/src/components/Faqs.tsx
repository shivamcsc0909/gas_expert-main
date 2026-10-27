import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookingModal } from "@/context/BookingModalContext";
import { SITE_CONFIG } from "@/config";

const faqs = [
  {
    q: "How quickly can a technician arrive at my home?",
    a: "We offer same-day service in most areas. After your booking is confirmed, our technician typically arrives within 60–90 minutes. In peak hours, it may take up to 2 hours — we will always inform you in advance.",
  },
  {
    q: "What gas stove brands do you repair?",
    a: "We repair all major brands including Prestige, Butterfly, Sunflame, Glen, Elica, Faber, Hindware, Bosch, IFB, Kaff, Pigeon, Wonderchef, and all local/unbranded models. If it runs on gas, we can fix it.",
  },
  {
    q: "Is there a service visit charge?",
    a: "Yes, there is a minimal visit charge of ₹200 which is completely waived off if you proceed with the repair. You only pay the actual repair cost — no hidden fees.",
  },
  {
    q: "Do you offer warranty on repairs?",
    a: "Absolutely. All our repairs come with a 30-day service warranty covering both parts and labour. If the same issue reappears within 30 days, we fix it at no extra charge.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all forms of payment — Cash, UPI (GPay, PhonePe, Paytm, BHIM), and debit/credit cards. You pay only after the repair is completed and you are satisfied.",
  },
  {
    q: "What is your policy if the problem cannot be fixed?",
    a: "We follow a strict No-Fix, No-Fee policy. If our technician cannot fix the issue, you will not be charged for the repair — only the minimal visit charge of ₹200 applies.",
  },
  {
    q: "Do you also do copper gas pipeline installation?",
    a: "Yes! We provide professional copper gas pipeline installation for both residential and commercial kitchens. We use ISI-certified copper pipes and ensure 100% leak-proof connections with proper testing.",
  },
  {
    q: "Are your services available on weekends and holidays?",
    a: "Yes, we are available 7 days a week, 365 days a year — including Sundays and all public holidays. Our working hours are 8:00 AM to 9:00 PM every day.",
  },
  {
    q: "Do your technicians carry spare parts?",
    a: "Our technicians carry all commonly needed spare parts in their service kit, including burners, igniters, knobs, valves, and rubber hoses. For rare parts, we may need 1 additional visit.",
  },
  {
    q: "Can I get a cost estimate before the repair starts?",
    a: "Yes, always. Our technician will inspect your appliance and give you a clear written estimate before starting any work. The final charge will match the estimate — no surprises.",
  },
];

export default function Faqs() {
  const { openModal } = useBookingModal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-10 sm:py-14 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* LEFT: header + CTA */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <span className="inline-block text-accent font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 bg-accent/10 px-4 py-1.5 rounded-full">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-5 leading-tight">
              Common Questions Answered
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed">
              Everything you need to know about our gas repair and installation services. Still have a question? Call us anytime.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={`tel:+${SITE_CONFIG.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-blue-700 transition-colors"
              >
                Call Us: {SITE_CONFIG.phone}
              </a>
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-accent text-white font-bold text-sm hover:bg-orange-600 transition-colors"
              >
                Book a Service
              </button>
            </div>

            {/* Quick stats */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { value: "1,200+", label: "Happy Customers" },
                { value: "4.9★", label: "Average Rating" },
                { value: "30 Day", label: "Repair Warranty" },
                { value: "Same Day", label: "Service Available" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-muted rounded-2xl p-4 text-center">
                  <p className="font-black text-foreground text-xl leading-none">{value}</p>
                  <p className="text-muted-foreground text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: accordion */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map(({ q, a }, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-2xl border transition-all duration-300",
                  open === index
                    ? "border-primary/30 shadow-md shadow-primary/5 bg-card"
                    : "border-border bg-card hover:border-primary/20"
                )}
              >
                <button
                  onClick={() => setOpen(open === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={open === index}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                      open === index ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    )}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className={cn(
                      "font-semibold text-sm sm:text-base transition-colors",
                      open === index ? "text-primary" : "text-foreground"
                    )}>
                      {q}
                    </span>
                  </div>
                  <ChevronDown className={cn(
                    "w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-300",
                    open === index ? "rotate-180 text-primary" : ""
                  )} />
                </button>

                <div className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  open === index ? "max-h-64" : "max-h-0"
                )}>
                  <div className="px-5 pb-5 pl-16">
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
