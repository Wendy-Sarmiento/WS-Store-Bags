"use client";

import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { toggle, totalItems, currency, toggleCurrency } = useCartStore();
  const [scrolled, setScrolled] = useState(false);
  const count = totalItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 0.55)"
          : "transparent",
        backdropFilter: scrolled ? "saturate(1.8) blur(28px)" : "none",
        WebkitBackdropFilter: scrolled
          ? "saturate(1.8) blur(28px)"
          : "none",
        borderBottom: scrolled
          ? "1px solid rgba(0, 0, 0, 0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className={`font-[family-name:var(--font-playfair)] font-bold tracking-[0.08em] uppercase leading-tight text-center transition-colors duration-500 ${
              scrolled ? "text-[var(--color-ink)]" : "text-white"
            }`}
          >
            <span className="block text-[15px]">Wendy</span>
            <span className="block text-[11px] tracking-[0.18em]">Sarmiento</span>
          </a>

          <div className="flex items-center gap-1 sm:gap-3">
            {/* Currency toggle */}
            <button
              onClick={toggleCurrency}
              className={`text-xs font-semibold px-3 py-2.5 rounded-full border transition-all duration-500 ${
                scrolled
                  ? "border-black/15 text-[rgba(0,0,0,0.8)] hover:border-[var(--color-cyan)]"
                  : "border-white/40 text-white hover:border-white/70"
              }`}
            >
              {currency}
            </button>

            {/* Cart button */}
            <button
              onClick={toggle}
              className={`relative p-2.5 rounded-full transition-all duration-500 ${
                scrolled
                  ? "text-[rgba(0,0,0,0.8)] hover:bg-black/5"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Abrir carrito"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-cyan)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
