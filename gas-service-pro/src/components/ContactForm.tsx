import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send, Phone, Clock, MessageCircle, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/config";
import { submitToGoogleSheets } from "@/lib/googleSheets";

const formSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  phone:   z.string().regex(/^\d{10}$/, "Must be a valid 10-digit number"),
  address: z.string().min(10, "Please provide full address"),
  problem: z.string().min(5, "Please describe the problem"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { ref, isVisible } = useScrollReveal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess,    setIsSuccess]    = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await submitToGoogleSheets({
      name: data.name,
      phone: data.phone,
      address: data.address,
      area: data.address,
      problem: data.problem,
      source: "Contact Form",
    });
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section id="contact" className="py-10 sm:py-14 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-7">
          <span className="inline-block text-accent font-bold tracking-wider uppercase text-xs sm:text-sm mb-3 bg-accent/10 px-4 py-1.5 rounded-full">Book a Service</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">Get Your Gas Appliance Fixed Today</h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Fill the form and our expert will call you within 15 minutes to confirm your appointment.
          </p>
        </div>

        <div
          ref={ref}
          className={cn(
            "max-w-5xl mx-auto bg-card rounded-3xl shadow-xl shadow-black/5 border border-border/50 overflow-hidden transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          <div className="grid md:grid-cols-5">

            {/* ── LEFT info panel ── */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#071f4e] via-primary to-[#0e4f9f] p-8 sm:p-10 text-white flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">Book Service</h3>
                <p className="text-white/70 text-sm sm:text-base mb-8 leading-relaxed">
                  Fill out the form or call/WhatsApp us directly. We'll confirm your appointment in minutes.
                </p>

                <div className="space-y-5">
                  <a
                    href={`tel:+${SITE_CONFIG.phoneRaw}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Phone className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] text-white/55 font-medium uppercase tracking-wide mb-0.5">Call Us Direct</p>
                      <p className="font-bold text-base">{SITE_CONFIG.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#25D366]/25 flex items-center justify-center group-hover:bg-[#25D366]/40 transition-colors">
                      <MessageCircle className="w-4.5 h-4.5 text-[#25D366]" />
                    </div>
                    <div>
                      <p className="text-[11px] text-white/55 font-medium uppercase tracking-wide mb-0.5">WhatsApp</p>
                      <p className="font-bold text-base">Chat with Us</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Clock className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] text-white/55 font-medium uppercase tracking-wide mb-0.5">Working Hours</p>
                      <p className="font-bold text-base">8:00 AM – 9:00 PM</p>
                      <p className="text-white/60 text-xs">Everyday, including Sundays</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <MapPin className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] text-white/55 font-medium uppercase tracking-wide mb-0.5">Service Area</p>
                      <p className="font-bold text-sm leading-snug">{SITE_CONFIG.serviceArea}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust note */}
              <div className="mt-8 pt-6 border-t border-white/15">
                <p className="text-white/50 text-xs leading-relaxed">
                  ✅ No advance payment required<br />
                  ✅ Pay only after service is done<br />
                  ✅ 30-day repair warranty
                </p>
              </div>
            </div>

            {/* ── RIGHT form panel ── */}
            <div className="md:col-span-3 p-8 sm:p-10 bg-white">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-scale-in">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-2">Request Received!</h4>
                  <p className="text-muted-foreground mb-8 text-sm sm:text-base max-w-sm">
                    Thank you! We've received your service request. Our technician will call you within 15 minutes.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-3 bg-muted text-foreground font-semibold rounded-xl hover:bg-muted/80 transition-colors"
                  >
                    Book Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-foreground">Full Name *</label>
                      <input
                        {...register("name")}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
                          errors.name ? "border-destructive" : "border-input focus:border-primary"
                        )}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-foreground">Phone Number *</label>
                      <input
                        {...register("phone")}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
                          errors.phone ? "border-destructive" : "border-input focus:border-primary"
                        )}
                        placeholder="10-digit mobile number"
                      />
                      {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Complete Address *</label>
                    <input
                      {...register("address")}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
                        errors.address ? "border-destructive" : "border-input focus:border-primary"
                      )}
                      placeholder="House/Flat No, Area, Landmark, Bengaluru"
                    />
                    {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground">Problem Description *</label>
                    <textarea
                      {...register("problem")}
                      rows={4}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none",
                        errors.problem ? "border-destructive" : "border-input focus:border-primary"
                      )}
                      placeholder="e.g. 2 burners not working, low flame, gas leakage smell, ignition not working..."
                    />
                    {errors.problem && <p className="text-xs text-destructive">{errors.problem.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-accent hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-[1px] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                    ) : (
                      <><Send className="w-5 h-5" /> Submit Service Request</>
                    )}
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    We will call you within 15 minutes to confirm your appointment.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
