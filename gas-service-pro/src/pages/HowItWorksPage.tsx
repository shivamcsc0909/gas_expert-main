import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import HowItWorks from "@/components/HowItWorks";
import PageHero from "@/components/PageHero";
import Faqs from "@/components/Faqs";
import { Clock, Star, ShieldCheck, ThumbsUp, Banknote, Wrench } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";
import { SITE_CONFIG } from "@/config";

const trustPoints = [
  {
    icon: Clock,
    label: "60–90 Min Arrival",
    desc: "From booking confirmation to technician at your door — fast every time.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Star,
    label: "4.9 / 5 Rating",
    desc: "Rated by 1,200+ satisfied customers across Bengaluru.",
    color: "bg-amber-50 text-amber-500",
  },
  {
    icon: ShieldCheck,
    label: "30-Day Warranty",
    desc: "All repairs are backed by our 30-day service guarantee on parts & labour.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: ThumbsUp,
    label: "No-Fix, No-Fee",
    desc: "If we can't fix it, you don't pay for the repair — simple as that.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Banknote,
    label: "Upfront Pricing",
    desc: "We give a clear estimate before starting. No hidden charges — ever.",
    color: "bg-orange-50 text-orange-500",
  },
  {
    icon: Wrench,
    label: "Genuine Spare Parts",
    desc: "We only use original or ISI-certified spare parts for all repairs.",
    color: "bg-rose-50 text-rose-500",
  },
];

export default function HowItWorksPage() {
  const { openModal } = useBookingModal();
  return (
    <div className="relative w-full">
      <Navbar />
      <PageHero
        breadcrumb="Simple Process"
        title="How It Works"
        subtitle="Getting your gas stove repaired is as easy as 1-2-3. No hassle, no advance payment, no hidden charges — just expert service at your doorstep."
      />

      <HowItWorks />

      {/* Why Trust Us */}
      <section className="py-10 sm:py-14 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block text-accent font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 bg-accent/10 px-4 py-1.5 rounded-full">
              Why Trust Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              What Makes Us Different
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              We don't just fix appliances — we build trust. Here's why thousands of Bengaluru families choose Gasxpert.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {trustPoints.map(({ icon: Icon, label, desc, color }) => (
              <div
                key={label}
                className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex items-start gap-4"
              >
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-base mb-1">{label}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Faqs />

      {/* Final CTA */}
      <section className="py-16 bg-muted">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
            Ready to Get Your Gas Appliance Fixed?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Book now and a certified technician will be at your doorstep today. Pay only after the repair is done.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-accent text-white font-bold text-base shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-1 transition-all duration-300"
            >
              Book Service Now
            </button>
            <a
              href={`tel:+${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-card text-foreground font-bold text-base border border-border hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
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
