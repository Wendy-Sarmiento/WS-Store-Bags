"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const TOTAL_FRAMES = 192;
const PRELOAD_COUNT = 30;

function frameUrl(index: number): string {
  const num = String(Math.min(Math.max(index, 1), TOTAL_FRAMES)).padStart(
    4,
    "0"
  );
  return `/frames/frame_${num}.webp`;
}

export default function HeroScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [loaded, setLoaded] = useState(false);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  }, []);

  useEffect(() => {
    let tl: gsap.core.Tween | null = null;

    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Pre-create all image elements
      const images: HTMLImageElement[] = [];
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        images.push(img);
      }
      imagesRef.current = images;

      // Eagerly load first PRELOAD_COUNT frames
      let loadedEager = 0;
      const onEagerLoad = () => {
        loadedEager++;
        if (loadedEager === 1) {
          drawFrame(0);
          setLoaded(true);
        }
      };

      for (let i = 0; i < PRELOAD_COUNT; i++) {
        images[i].onload = onEagerLoad;
        images[i].src = frameUrl(i + 1);
      }

      // Lazy-load the rest
      for (let i = PRELOAD_COUNT; i < TOTAL_FRAMES; i++) {
        images[i].src = frameUrl(i + 1);
      }

      // GSAP ScrollTrigger for frame scrubbing
      const obj = { frame: 0 };
      tl = gsap.to(obj, {
        frame: TOTAL_FRAMES - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
        onUpdate: () => {
          const idx = Math.round(obj.frame);
          if (idx !== currentFrameRef.current) {
            currentFrameRef.current = idx;
            drawFrame(idx);
          }
        },
      });

      // --- Fade-IN on page load (time-based, not scroll) ---

      // Set initial state
      gsap.set(".hero-canvas-wrap", {
        filter: "blur(40px) brightness(2) saturate(0)",
        scale: 1.12,
      });
      gsap.set(".hero-fadein-gradient", { y: "0%" });
      gsap.set(".hero-fadein-overlay", { opacity: 1 });

      // Timeline: materializes over ~2.5s on load
      const fadeInTL = gsap.timeline({ delay: 0.2 });

      fadeInTL
        .to(".hero-fadein-overlay", {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        })
        .to(
          ".hero-fadein-gradient",
          { y: "100%", duration: 1.2, ease: "power2.inOut" },
          0.1
        )
        .to(
          ".hero-canvas-wrap",
          {
            filter: "blur(16px) brightness(1.5) saturate(0.3)",
            scale: 1.06,
            duration: 0.8,
            ease: "power2.out",
          },
          0
        )
        .to(
          ".hero-canvas-wrap",
          {
            filter: "blur(4px) brightness(1.1) saturate(0.7)",
            scale: 1.02,
            duration: 0.7,
            ease: "power2.out",
          },
          0.6
        )
        .to(
          ".hero-canvas-wrap",
          {
            filter: "blur(0px) brightness(1) saturate(1)",
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          1.1
        );

      // --- Hero text entrance ---
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          delay: 0.3,
        }
      );
      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.7 }
      );

      // --- Hero text fade out on scroll ---
      gsap.to(".hero-text-container", {
        opacity: 0,
        y: -80,
        scale: 0.9,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "15% top",
          scrub: true,
        },
      });

      // --- Progressive dissolve: single timeline so reverse works cleanly ---
      const dissolveTL = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "65% top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      dissolveTL
        // 0-0.28: subtle blur + brightness lift
        .to(
          ".hero-canvas-wrap",
          {
            filter: "blur(4px) brightness(1.15) saturate(1)",
            scale: 1.02,
            duration: 0.28,
          },
          0
        )
        // 0.14-0.56: gradient wipe from bottom
        .to(
          ".hero-dissolve-gradient",
          { y: "0%", duration: 0.56 },
          0.14
        )
        // 0.28-0.56: heavier blur
        .to(
          ".hero-canvas-wrap",
          {
            filter: "blur(16px) brightness(1.6) saturate(0.3)",
            scale: 1.06,
            duration: 0.28,
          },
          0.28
        )
        // 0.56-0.85: full white overlay
        .to(
          ".hero-dissolve-overlay",
          { opacity: 1, duration: 0.29 },
          0.56
        )
        // 0.56-1: extreme blur
        .to(
          ".hero-canvas-wrap",
          {
            filter: "blur(40px) brightness(2) saturate(0)",
            scale: 1.12,
            duration: 0.44,
          },
          0.56
        );

      // --- Scroll indicator fade ---
      gsap.to(".hero-scroll-indicator", {
        opacity: 0,
        y: 20,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "5% top",
          scrub: true,
        },
      });
    }

    init();

    return () => {
      if (tl) tl.kill();
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      });
    };
  }, [drawFrame]);

  return (
    <div ref={containerRef} className="h-[500vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[var(--color-ink)]">
        {/* Canvas wrapper for scale + blur dissolve */}
        <div className="hero-canvas-wrap w-full h-full">
          <canvas
            ref={canvasRef}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ maxHeight: "100vh" }}
          />
        </div>

        {/* === FADE-IN layers === */}
        {/* White overlay that fades out at start */}
        <div className="hero-fadein-overlay absolute inset-0 bg-white pointer-events-none z-10" />
        {/* Gradient wipe from top — slides down to reveal */}
        <div
          className="hero-fadein-gradient absolute inset-0 pointer-events-none z-[9]"
          style={{
            background:
              "linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* === FADE-OUT layers === */}
        {/* Gradient wipe from bottom — starts below, slides up */}
        <div
          className="hero-dissolve-gradient absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, white 0%, white 40%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0) 100%)",
            transform: "translateY(100%)",
          }}
        />

        {/* Final full white dissolve */}
        <div className="hero-dissolve-overlay absolute inset-0 bg-white opacity-0 pointer-events-none" />

        {/* Overlay text — inverted colors + fade out on scroll */}
        <div className="hero-text-container absolute inset-0 flex flex-col items-center justify-center pointer-events-none mix-blend-difference">
          <div className="text-center px-4">
            <h1 className="hero-title text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 opacity-0 text-white">
              Wendy Sarmiento
            </h1>
            <p className="hero-subtitle text-sm sm:text-lg md:text-2xl font-bold tracking-[0.25em] uppercase opacity-0 text-white">
              Arte tejido a mano
            </p>
          </div>
        </div>

        {/* Loading skeleton — logo pulse while frames load */}
        {!loaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white">
            <span className="font-[family-name:var(--font-playfair)] text-xl font-bold tracking-[0.1em] uppercase text-[var(--color-ink)] opacity-30 animate-pulse">
              Wendy Sarmiento
            </span>
            <div className="mt-6 w-32 h-0.5 rounded-full bg-[var(--color-border)] overflow-hidden">
              <div className="h-full w-1/3 rounded-full bg-[var(--color-cyan)] animate-[shimmer_1.5s_ease-in-out_infinite]" />
            </div>
          </div>
        )}

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 mix-blend-difference">
          <div className="flex flex-col items-center gap-2 text-white">
            <span className="text-[10px] tracking-widest uppercase opacity-60">
              Scroll
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="animate-bounce"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
