"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      // Initial state: white, blurred, scaled — like the hero fade-in
      gsap.set(".cta-collage", {
        filter: "blur(40px) brightness(2) saturate(0)",
        scale: 1.15,
      });
      gsap.set(".cta-glass-overlay", { opacity: 0 });
      gsap.set(".cta-fadein-overlay", { opacity: 1 });
      gsap.set(".cta-fadein-gradient", { y: "-100%" });
      gsap.set(".cta-content", { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 30%",
          scrub: true,
        },
      });

      tl
        // White overlay fades out
        .to(".cta-fadein-overlay", { opacity: 0, duration: 0.3 }, 0)
        // Gradient wipe reveals from top
        .to(".cta-fadein-gradient", { y: "100%", duration: 0.6 }, 0)
        // Collage materializes: extreme blur → medium
        .to(
          ".cta-collage",
          {
            filter: "blur(16px) brightness(1.4) saturate(0.4)",
            scale: 1.08,
            duration: 0.4,
          },
          0
        )
        // Medium → subtle
        .to(
          ".cta-collage",
          {
            filter: "blur(4px) brightness(1.1) saturate(0.8)",
            scale: 1.03,
            duration: 0.3,
          },
          0.3
        )
        // Fully resolved
        .to(
          ".cta-collage",
          {
            filter: "blur(0px) brightness(1) saturate(1)",
            scale: 1,
            duration: 0.3,
          },
          0.5
        )
        // Glass overlay fades in
        .to(".cta-glass-overlay", { opacity: 1, duration: 0.4 }, 0.4)
        // Content appears
        .to(".cta-content", { opacity: 1, y: 0, duration: 0.3 }, 0.6);

      // Content stagger animations — trigger earlier (top 60%)
      gsap.fromTo(
        ".cta-title",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 60%", once: true },
        }
      );
      gsap.fromTo(
        ".cta-desc",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 60%", once: true },
        }
      );
      gsap.fromTo(
        ".cta-button",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 60%", once: true },
        }
      );
    }

    init();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-36 text-center overflow-hidden">
      {/* Background: product collage */}
      <div className="cta-collage absolute inset-0 grid grid-cols-3 gap-0">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="relative overflow-hidden">
            <Image
              src={`/products/bag${n}.webp`}
              alt=""
              fill
              sizes="33vw"
              className="object-cover scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Fade-in layers (start visible, removed by scroll) */}
      <div className="cta-fadein-overlay absolute inset-0 bg-white pointer-events-none z-10" />
      <div
        className="cta-fadein-gradient absolute inset-0 pointer-events-none z-[9]"
        style={{
          background:
            "linear-gradient(to bottom, white 0%, white 40%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Frosted glass overlay */}
      <div
        className="cta-glass-overlay absolute inset-0 opacity-0"
        style={{
          backgroundColor: "rgba(0, 80, 158, 0.55)",
          backdropFilter: "saturate(1.8) blur(24px)",
          WebkitBackdropFilter: "saturate(1.8) blur(24px)",
        }}
      />

      {/* Soft top edge — blends white section above into the CTA */}
      <div
        className="absolute inset-x-0 top-0 h-36 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to bottom, white 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Content */}
      <div className="cta-content relative max-w-2xl mx-auto px-4 z-30">
        <h2 className="cta-title text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          ¿Lista para tu bolso único?
        </h2>
        <p className="cta-desc text-white/85 mb-10 text-lg drop-shadow">
          Escríbenos por WhatsApp y te asesoramos en tu elección perfecta.
        </p>
        <a
          href="https://wa.me/573006313294?text=Hola%20Wendy!%20Me%20interesa%20conocer%20tu%20colecci%C3%B3n%20de%20bolsos."
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button inline-flex items-center gap-2 px-8 py-4 font-bold rounded-full text-lg text-white border border-white/25 transition-all duration-500 ease-out hover:scale-105 hover:border-white/60 hover:shadow-[0_0_30px_rgba(255,255,255,0.25),0_8px_32px_rgba(0,80,158,0.3)] active:scale-95"
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Escribir por WhatsApp
        </a>
      </div>
    </section>
  );
}
