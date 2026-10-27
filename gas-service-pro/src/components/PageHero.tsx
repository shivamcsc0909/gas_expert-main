interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

export default function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden bg-hero-gradient">
      {/* Orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/20 blur-[100px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-accent/15 blur-[80px] translate-y-1/2 -translate-x-1/4" />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '36px 36px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {breadcrumb && (
          <p className="text-accent font-semibold uppercase tracking-widest text-xs mb-4">{breadcrumb}</p>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Curved divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
          <path d="M0 80H1440V0C1200 60 960 80 720 80C480 80 240 60 0 0V80Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
}
