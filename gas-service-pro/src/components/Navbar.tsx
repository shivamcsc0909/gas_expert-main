import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/config";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Contact", href: "/contact" },
  ];

  const isHome = location === "/";
  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isTransparent ? "bg-transparent py-5" : "glass-nav py-3"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <img
              src="/gasxpert-logo.png"
              alt="Gasxpert"
              className="h-10 w-auto object-contain flex-shrink-0 drop-shadow-sm"
            />
            <span className="text-2xl font-black tracking-tight leading-none">
              <span className="text-accent">Gas</span>
              <span className={cn(
                "transition-colors duration-300",
                isTransparent ? "text-white" : "text-foreground"
              )}>xpert</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 relative group",
                    isTransparent
                      ? isActive ? "text-white font-semibold" : "text-white/80 hover:text-white"
                      : isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-200",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:+${SITE_CONFIG.phoneRaw}`}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all duration-300",
                isTransparent
                  ? "bg-white text-primary hover:bg-white/90 shadow-lg"
                  : "bg-primary text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
              )}
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              "md:hidden p-2 rounded-lg backdrop-blur-md",
              isTransparent ? "text-white bg-white/10" : "text-foreground bg-muted"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-[64px] bg-white border-b border-border shadow-2xl transition-all duration-300 ease-in-out origin-top overflow-hidden",
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col p-4 gap-2">
          {navLinks.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-base font-medium p-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            );
          })}
          <a
            href={`tel:+${SITE_CONFIG.phoneRaw}`}
            className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-semibold bg-primary text-white mt-2"
          >
            <Phone className="w-5 h-5" />
            <span>{SITE_CONFIG.phone}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
