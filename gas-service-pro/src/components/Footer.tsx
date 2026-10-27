import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { SITE_CONFIG } from "@/config";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">

      {/* Top CTA strip */}
      <div className="bg-accent/90 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-semibold text-sm sm:text-base text-center sm:text-left">
            🔧 Gas stove not working? Get it fixed today — same day service available!
          </p>
          <a
            href={`tel:+${SITE_CONFIG.phoneRaw}`}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-accent font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Now: {SITE_CONFIG.phone}
          </a>
        </div>
      </div>

      <div className="pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-5 cursor-pointer w-fit">
                <img src="/gasxpert-logo.png" alt="Gasxpert" className="h-16 w-auto object-contain flex-shrink-0" />
                <span className="text-2xl font-black tracking-tight leading-none">
                  <span className="text-accent">Gas</span>
                  <span className="text-white">xpert</span>
                </span>
              </Link>
              <p className="text-slate-400 leading-relaxed text-sm mb-5">
                {SITE_CONFIG.city}'s most trusted gas stove repair, pipeline installation, and appliance maintenance service — by {SITE_CONFIG.brandName}.
              </p>

              {/* Working hours */}
              <div className="flex items-start gap-2 text-sm text-slate-400 mb-5">
                <Clock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white text-xs uppercase tracking-wide mb-0.5">Working Hours</p>
                  <p>8:00 AM – 9:00 PM</p>
                  <p className="text-xs text-slate-500">Everyday, including Sundays</p>
                </div>
              </div>

              {/* Social links */}
              {/*
               * 📱 SOCIAL LINKS: Replace # with actual social profile URLs
               * Add your real Facebook, Instagram, YouTube page links
               */}
              <div className="flex gap-3">
                {[
                  { Icon: Facebook,      href: "#", label: "Facebook"  },
                  { Icon: Instagram,     href: "#", label: "Instagram" },
                  { Icon: WhatsAppIcon,  href: `https://wa.me/${SITE_CONFIG.whatsapp}`, label: "WhatsApp" },
                  { Icon: Youtube,       href: "#", label: "YouTube"   },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href !== "#" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-accent hover:text-white transition-colors text-slate-400"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base font-bold text-white mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: "Home",         href: "/"            },
                  { label: "Our Services", href: "/services"    },
                  { label: "How It Works", href: "/how-it-works"},
                  { label: "Book Service", href: "/contact"     },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-slate-400 hover:text-accent text-sm transition-colors flex items-center gap-1.5 group">
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-base font-bold text-white mb-5">Our Services</h4>
              <ul className="space-y-3">
                {[
                  "Gas Stove Repair",
                  "Burner Repair & Cleaning",
                  "Ignition Fix",
                  "Gas Leakage Fix",
                  "Built-in Hob Repair",
                  "Copper Pipeline Installation",
                  "Annual Maintenance",
                ].map((s) => (
                  <li key={s}>
                    <Link href="/services" className="text-slate-400 hover:text-accent text-sm transition-colors flex items-center gap-1.5 group">
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-base font-bold text-white mb-5">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {/*
                       * 📍 ADDRESS: Replace with actual business address
                       * e.g. "Shop No. 5, Near XYZ Market, Koramangala, Bengaluru 560034"
                       */}
                      {SITE_CONFIG.address}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">Serving all of {SITE_CONFIG.serviceArea}</p>
                  </div>
                </li>
                <li>
                  <a href={`tel:+${SITE_CONFIG.phoneRaw}`} className="flex items-center gap-3 hover:text-accent transition-colors group">
                    <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-white">{SITE_CONFIG.phone}</p>
                      <p className="text-xs text-slate-500">Call or WhatsApp</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="mailto:support@gasxpert.in" className="flex items-center gap-3 hover:text-accent transition-colors">
                    <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-sm text-slate-400">support@gasxpert.in</p>
                    </div>
                  </a>
                </li>
              </ul>

              {/* Trust badges */}
              <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  No-Fix No-Fee Policy
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  30-Day Repair Warranty
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Certified & Verified Technicians
                </div>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} {SITE_CONFIG.brandName}. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
