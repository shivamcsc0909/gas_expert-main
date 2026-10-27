import { useState, useEffect, useRef, useCallback } from "react";
import { X, Phone, MessageCircle, Send, Loader2, CheckCircle2, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/config";
import { cn } from "@/lib/utils";
import { submitToGoogleSheets } from "@/lib/googleSheets";

const SHOW_DELAY  = 3000;   // show popup after 3 seconds
const AUTO_CLOSE  = 10;     // auto-close countdown in seconds

export default function AutoPopup() {
  const [show, setShow]             = useState(false);
  const [countdown, setCountdown]   = useState(AUTO_CLOSE);
  const [name, setName]             = useState("");
  const [phone, setPhone]           = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [errors, setErrors]         = useState<{ name?: string; phone?: string }>({});

  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTyping   = useRef(false);   // true when user has started typing

  /* ── Show popup on every mount (every page load / refresh) ── */
  useEffect(() => {
    const t = setTimeout(() => setShow(true), SHOW_DELAY);
    return () => clearTimeout(t);
  }, []);

  /* ── Start countdown when popup opens ── */
  const startCountdown = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current!);
          if (!isTyping.current) setShow(false);   // only close if not typing
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (!show) return;
    setCountdown(AUTO_CLOSE);
    startCountdown();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [show, startCountdown]);

  /* ── When user types: stop auto-close ── */
  const handleNameChange = (v: string) => {
    setName(v);
    if (v.length > 0) {
      isTyping.current = true;
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    }
  };

  const handlePhoneChange = (v: string) => {
    setPhone(v);
    if (v.length > 0) {
      isTyping.current = true;
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    }
  };

  const close = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setShow(false);
  };

  const validate = () => {
    const e: { name?: string; phone?: string } = {};
    if (name.trim().length < 2)         e.name  = "Please enter your name";
    if (!/^\d{10}$/.test(phone.trim())) e.phone = "Enter valid 10-digit number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    await submitToGoogleSheets({ name, phone, source: "Auto Popup" });
    setSubmitting(false);
    setSuccess(true);
    setTimeout(close, 2500);
  };

  if (!show) return null;

  const progress = ((AUTO_CLOSE - countdown) / AUTO_CLOSE) * 100;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

      {/* Card — max-height so it never overflows screen */}
      <div
        className="relative bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
        style={{ animation: "popupIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-10 flex-shrink-0">
          <div
            className="h-full bg-accent transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="bg-gradient-to-br from-[#05184a] via-[#0a2d6e] to-primary px-5 pt-5 pb-4 text-white relative flex-shrink-0">

          {/* Close */}
          <button onClick={close}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors z-10">
            <X className="w-3.5 h-3.5 text-white" />
          </button>

          {/* Logo row */}
          <div className="flex items-center gap-2.5 mb-3 pr-8">
            <img src="/gasxpert-logo.png" alt="Gasxpert"
              className="h-8 w-8 object-contain flex-shrink-0 drop-shadow" />
            <div className="flex-1 min-w-0">
              <p className="text-base font-black leading-none tracking-tight">
                <span className="text-accent">Gas</span><span className="text-white">xpert</span>
              </p>
              <p className="text-white/50 text-[10px] font-medium">Trusted Gas Service</p>
            </div>
            {!isTyping.current && (
              <div className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-1 border border-white/15 flex-shrink-0">
                <Clock className="w-3 h-3 text-accent" />
                <span className="text-white font-bold text-xs tabular-nums">{countdown}s</span>
              </div>
            )}
          </div>

          {/* Badge + headline */}
          <div className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/30 rounded-full px-2.5 py-0.5 mb-1.5">
            <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
              <span className="animate-ping absolute inset-0 rounded-full bg-accent opacity-75" />
              <span className="relative rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Same Day Service</span>
          </div>
          <h2 className="text-xl font-black leading-tight text-white">
            Book a <span className="text-accent">Free</span> Callback Now
          </h2>
          <p className="text-white/55 text-[11px] mt-1">We call you back within 15 minutes</p>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 pt-3 border-t border-white/10">
            {["✓ No Advance Payment", "✓ 30-Day Warranty", "✓ Certified Experts"].map((t) => (
              <span key={t} className="text-[10px] text-white/50 font-medium">{t}</span>
            ))}
          </div>
        </div>

        {/* Body — scrollable if needed */}
        <div className="px-5 py-4 bg-white overflow-y-auto">
          {success ? (
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">Request Received!</h3>
              <p className="text-sm text-muted-foreground">Our technician will call you shortly.</p>
            </div>
          ) : (
            <>
              <div className="space-y-2.5 mb-3">
                <div>
                  <input type="text" value={name} onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Your Full Name"
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 text-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                      errors.name ? "border-red-400" : "border-gray-200 focus:border-primary"
                    )} />
                  {errors.name && <p className="text-xs text-red-500 mt-1 pl-1">{errors.name}</p>}
                </div>
                <div>
                  <input type="tel" value={phone} onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="10-digit Mobile Number"
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border text-sm bg-gray-50 text-foreground focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                      errors.phone ? "border-red-400" : "border-gray-200 focus:border-primary"
                    )} />
                  {errors.phone && <p className="text-xs text-red-500 mt-1 pl-1">{errors.phone}</p>}
                </div>
              </div>

              <button onClick={handleSubmit} disabled={submitting}
                className="w-full py-3 rounded-xl bg-accent hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-accent/25 hover:-translate-y-[1px] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 mb-2.5">
                {submitting
                  ? <><Loader2 className="w-4 h-4 animate-spin" />Submitting...</>
                  : <><Send className="w-4 h-4" />Request Free Callback</>}
              </button>

              <div className="flex items-center gap-2 mb-2.5">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-[10px] text-gray-400 font-semibold whitespace-nowrap">OR CONTACT DIRECTLY</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a href={`tel:+${SITE_CONFIG.phoneRaw}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-blue-800 transition-colors">
                  <Phone className="w-3.5 h-3.5" /> Call Now
                </a>
                <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#1db954] transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>

              <p className="text-center text-[10px] text-gray-400 mt-2.5">
                🔒 Your information is 100% secure & private
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
      `}</style>
    </div>
  );
}
