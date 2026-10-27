import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import ContactForm from "@/components/ContactForm";
import ServiceArea from "@/components/ServiceArea";
import PageHero from "@/components/PageHero";
import { Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config";

const contactDetails = [
  {
    icon: Phone,
    label: "Call / WhatsApp",
    value: SITE_CONFIG.phone,
    sub: "Available 8 AM – 9 PM daily",
    href: `tel:+${SITE_CONFIG.phoneRaw}`,
    color: "bg-blue-50 text-primary",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp Chat",
    value: "Chat with Us",
    sub: "Quick booking via WhatsApp",
    href: `https://wa.me/${SITE_CONFIG.whatsapp}`,
    color: "bg-green-50 text-[#25D366]",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "support@gasxpert.in",
    sub: "Reply within 2 hours",
    href: "mailto:support@gasxpert.in",
    color: "bg-orange-50 text-accent",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "8:00 AM – 9:00 PM",
    sub: "Every day, including Sundays",
    href: "#",
    color: "bg-purple-50 text-purple-600",
  },
];

const guarantees = [
  "15-minute booking confirmation",
  "Technician arrives in 60–90 minutes",
  "Free inspection before starting",
  "Pay only after repair is done",
  "30-day warranty on all repairs",
  "No-Fix, No-Fee policy",
];

export default function ContactPage() {
  return (
    <div className="relative w-full">
      <Navbar />
      <PageHero
        breadcrumb="Get In Touch"
        title="Book a Service"
        subtitle="Fill the form or call us directly. Our team responds within 15 minutes to confirm your appointment. Pay only after the job is done."
      />

      <section className="py-10 sm:py-14 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Contact info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
            {contactDetails.map(({ icon: Icon, label, value, sub, href, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 group"
              >
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
                  <p className="font-bold text-foreground text-sm sm:text-base leading-snug break-all">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Service guarantees strip */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-2xl px-6 py-5 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="font-bold text-foreground text-sm sm:text-base">Our Service Guarantee</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {guarantees.map((g) => (
                <div key={g} className="flex items-center gap-2 text-sm text-foreground/75">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {g}
                </div>
              ))}
            </div>
          </div>

          {/* Contact form — rendered without section padding (page already has py-16) */}
          <ContactForm />
        </div>
      </section>

      <ServiceArea />
      <Footer />
      <FloatingButton />
    </div>
  );
}
