"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function Toast() {
  const { lastAdded, clearLastAdded } = useCartStore();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!lastAdded) return;

    setExiting(false);
    setVisible(true);

    const exitTimer = setTimeout(() => setExiting(true), 2200);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      clearLastAdded();
    }, 2700);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, [lastAdded, clearLastAdded]);

  if (!visible || !lastAdded) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-[60] flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-500 ${
        exiting
          ? "opacity-0 translate-y-4 scale-95 -translate-x-1/2"
          : "opacity-100 translate-y-0 scale-100 -translate-x-1/2"
      }`}
      style={{
        backgroundColor: "rgba(220,235,250,0.45)",
        backdropFilter: "saturate(1.8) blur(28px)",
        WebkitBackdropFilter: "saturate(1.8) blur(28px)",
        border: "1px solid rgba(255,255,255,0.5)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[var(--color-cyan)]/20 animate-ping" />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <span className="text-sm font-medium text-[var(--color-ink)]">
        <strong>{lastAdded}</strong> agregado al carrito
      </span>
    </div>
  );
}
