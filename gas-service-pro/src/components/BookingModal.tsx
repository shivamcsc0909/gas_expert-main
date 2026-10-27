import { useEffect, useRef, useState } from "react";
import { X, Phone, CheckCircle2, Send, User, MapPin, Wrench, FileText, Loader2 } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/config";
import { submitToGoogleSheets } from "@/lib/googleSheets";

const SERVICES = [
  "Gas Stove Repair",
  "Burner Cleaning",
  "Ignition Fix",
  "Gas Leak Detection",
  "Hob / Cooking Range Repair",
  "Annual Maintenance",
  "Copper Pipeline Installation",
  "Other",
];

export default function BookingModal() {
  const { isOpen, closeModal } = useBookingModal();
  const [form, setForm] = useState({ name: "", phone: "", service: "", area: "", problem: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  /* Lock body scroll */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.area) return;
    setSubmitting(true);
    await submitToGoogleSheets({ ...form, source: "Booking Modal" });
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", phone: "", service: "", area: "", problem: "" });
      closeModal();
    }, 2500);
  };

  const isValid = form.name.trim() && form.phone.trim().length >= 10 && form.area.trim();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card */}
      <div
        className={cn(
          "relative z-10 w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden",
          "animate-slide-up sm:animate-fade-in-up"
        )}
        style={{ maxHeight: "95dvh", overflowY: "auto" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF7A00] to-orange-500 px-5 py-4 flex items-start justify-between">
          <div>
            <h2 className="text-white font-black text-lg leading-tight">Book a Service</h2>
            <p className="text-white/80 text-xs mt-0.5">Same day service · No-Fix No-Fee</p>
          </div>
          <button onClick={closeModal} className="text-white/80 hover:text-white p-1 -mr-1 -mt-1 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-black text-foreground mb-1">Booking Received!</h3>
            <p className="text-muted-foreground text-sm">Our technician will call you within 15 minutes.</p>
          </div>
        ) : (
          <div className="p-5 flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                <User className="w-3.5 h-3.5 text-accent" /> Full Name *
              </label>
              <input
                ref={firstInputRef}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                <Phone className="w-3.5 h-3.5 text-accent" /> Phone Number *
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                type="tel"
                inputMode="numeric"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
              />
            </div>

            {/* Service */}
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                <Wrench className="w-3.5 h-3.5 text-accent" /> Service Needed
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
              >
                <option value="">Select a service</option>
                {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Area */}
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-accent" /> Your Area / Address *
              </label>
              <input
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="e.g. Koramangala, Bengaluru"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
              />
            </div>

            {/* Problem */}
            <div>
              <label className="text-xs font-semibold text-foreground/70 mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                <FileText className="w-3.5 h-3.5 text-accent" /> Describe the Problem
              </label>
              <textarea
                name="problem"
                value={form.problem}
                onChange={handleChange}
                rows={2}
                placeholder="e.g. Burner not lighting, gas smell, ignition sparks but doesn't light..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={handleSubmit}
                disabled={!isValid || submitting}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all duration-200",
                  isValid && !submitting
                    ? "bg-accent text-white hover:bg-orange-600 shadow-md hover:shadow-lg hover:-translate-y-[1px]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {submitting
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  : <><Send className="w-4 h-4" /> Submit Booking</>
                }
              </button>
              <a
                href={`tel:+${SITE_CONFIG.phoneRaw}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                Call Directly
              </a>
            </div>

            <p className="text-center text-[10px] text-muted-foreground leading-relaxed">
              By submitting, you agree to be contacted by Gasxpert. We respect your privacy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
