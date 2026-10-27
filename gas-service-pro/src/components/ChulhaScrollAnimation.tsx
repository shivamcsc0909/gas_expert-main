import { useEffect, useRef, useState } from "react";

/* ─── Config ────────────────────────────────────────────────── */
const MAX_IMAGES = 500;      // try up to this many frames
const SECTION_SCREENS = 5;   // total scroll height = 5 × 100vh

const TEXTS = [
  {
    text: "Gas Leak Fix in 30 Min",
    sub:  "Certified safety experts at your doorstep",
    start: 0.04,
    end:   0.32,
  },
  {
    text: "Ignition & Burner Repair",
    sub:  "All brands, all models — fixed fast",
    start: 0.37,
    end:   0.63,
  },
  {
    text: "Doorstep Service in Kanpur",
    sub:  "We come to you. No waiting, no hassle.",
    start: 0.68,
    end:   0.95,
  },
];

/* ─── Helpers ───────────────────────────────────────────────── */
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function textOpacity(progress: number, start: number, end: number): number {
  const fade = 0.05;
  if (progress < start - fade || progress > end + fade) return 0;
  if (progress < start) return (progress - (start - fade)) / fade;
  if (progress > end)   return 1 - (progress - end) / fade;
  return 1;
}

/* ─── Component ─────────────────────────────────────────────── */
export default function ChulhaScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const imagesRef  = useRef<HTMLImageElement[]>([]);
  const rafRef     = useRef<number>(0);
  const lastIdxRef = useRef(-1);

  const [progress,    setProgress]    = useState(0);
  const [frameCount,  setFrameCount]  = useState(0);
  const [loadDone,    setLoadDone]    = useState(false);

  /* ── Load frames sequentially, stop on first 404 ── */
  useEffect(() => {
    let cancelled = false;
    const acc: HTMLImageElement[] = [];

    const tryNext = (n: number) => {
      if (cancelled || n > MAX_IMAGES) {
        if (!cancelled) finish(acc);
        return;
      }
      const img = new Image();
      img.src = `${import.meta.env.BASE_URL}images/chulha-repair/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;
      img.onload  = () => { acc.push(img); tryNext(n + 1); };
      img.onerror = () => finish(acc);
    };

    const finish = (imgs: HTMLImageElement[]) => {
      if (cancelled) return;
      imagesRef.current = imgs;
      setFrameCount(imgs.length);
      setLoadDone(true);
    };

    tryNext(1);
    return () => { cancelled = true; };
  }, []);

  /* ── Resize canvas ── */
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    if (lastIdxRef.current >= 0) drawFrame(lastIdxRef.current);
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadDone]);

  /* ── Draw one frame ── */
  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current;
    const imgs   = imagesRef.current;
    if (!canvas || !imgs.length) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;

    // Flame-dark gradient base
    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0,   "#0d0300");
    bg.addColorStop(0.5, "#2a0900");
    bg.addColorStop(1,   "#0d0300");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // Image cover-fit
    const img = imgs[idx];
    if (!img) return;
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    const sw    = img.naturalWidth  * scale;
    const sh    = img.naturalHeight * scale;
    const sx    = (width  - sw) / 2;
    const sy    = (height - sh) / 2;
    ctx.drawImage(img, sx, sy, sw, sh);

    // Subtle vignette overlay
    const vignette = ctx.createRadialGradient(
      width / 2, height / 2, height * 0.15,
      width / 2, height / 2, height * 0.85
    );
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,0.65)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);
  };

  /* ── Scroll listener ── */
  useEffect(() => {
    if (!loadDone) return;

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop    = section.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = section.offsetHeight;
      const viewH         = window.innerHeight;
      const scrollable    = sectionHeight - viewH;
      const scrolled      = window.scrollY - sectionTop;
      const prog          = clamp(scrolled / scrollable, 0, 1);

      setProgress(prog);

      const imgs = imagesRef.current;
      if (!imgs.length) return;
      const idx = clamp(Math.round(prog * (imgs.length - 1)), 0, imgs.length - 1);

      if (idx !== lastIdxRef.current) {
        lastIdxRef.current = idx;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(idx));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // draw frame 0 on mount
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadDone]);

  /* ─── Render ─────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      style={{ height: `${SECTION_SCREENS * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* ① Flame gradient background — always present */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 120%, #FF8C00 0%, #FF4500 30%, #8B1A00 60%, #1a0400 100%)",
          }}
        />

        {/* Animated glow orbs (fallback visual when no images) */}
        {!frameCount && (
          <>
            <div
              className="absolute z-0 rounded-full blur-3xl opacity-60 animate-pulse"
              style={{
                width: "60vw", height: "60vw",
                background: "radial-gradient(circle, #FF4500 0%, transparent 70%)",
                top: "20%", left: "20%",
                animationDuration: "3s",
              }}
            />
            <div
              className="absolute z-0 rounded-full blur-3xl opacity-40"
              style={{
                width: "40vw", height: "40vw",
                background: "radial-gradient(circle, #FF8C00 0%, transparent 70%)",
                bottom: "10%", right: "15%",
                animation: "float 5s ease-in-out infinite 1s",
              }}
            />
          </>
        )}

        {/* ② Canvas — visible once images are ready */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-10"
          style={{
            opacity:    frameCount > 0 ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />

        {/* ③ Top gradient fade */}
        <div
          className="absolute inset-x-0 top-0 h-32 z-20 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
          }}
        />

        {/* ④ Bottom gradient fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 z-20 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
          }}
        />

        {/* ⑤ Overlay texts */}
        {TEXTS.map(({ text, sub, start, end }) => {
          const opacity = textOpacity(progress, start, end);
          return (
            <div
              key={text}
              className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-20 sm:pb-24 px-6 text-center pointer-events-none"
              style={{
                opacity,
                transform: `translateY(${(1 - opacity) * 20}px)`,
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
            >
              <h2
                className="text-4xl sm:text-5xl lg:text-[3.75rem] font-black text-white leading-tight mb-3"
                style={{
                  textShadow:
                    "0 0 40px rgba(255,69,0,0.9), 0 2px 20px rgba(0,0,0,0.8), 0 0 80px rgba(255,140,0,0.6)",
                }}
              >
                {text}
              </h2>
              <p
                className="text-base sm:text-lg text-white/80 font-medium max-w-sm"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
              >
                {sub}
              </p>
            </div>
          );
        })}

        {/* ⑥ Scroll indicator — only at the very start */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none"
          style={{
            opacity:    progress < 0.04 ? 1 - progress / 0.04 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <span className="text-white/50 text-xs font-medium uppercase tracking-widest">
            Scroll to explore
          </span>
          <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>

        {/* ⑦ Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-50 bg-white/10">
          <div
            className="h-full"
            style={{
              width:      `${progress * 100}%`,
              background: "linear-gradient(90deg, #FF4500, #FF8C00)",
              transition: "width 0.05s linear",
            }}
          />
        </div>

        {/* ⑧ Frame counter (dev helper — remove in prod) */}
        {frameCount > 0 && (
          <div className="absolute top-20 right-4 z-50 text-white/30 text-xs font-mono pointer-events-none">
            {Math.round(progress * (frameCount - 1)) + 1} / {frameCount}
          </div>
        )}
      </div>
    </section>
  );
}
