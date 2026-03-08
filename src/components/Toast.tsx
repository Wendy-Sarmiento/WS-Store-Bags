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
      className={`fixed bottom-6 left-1/2 z-[60] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl shadow-black/15 transition-all duration-500 ${
        exiting
          ? "opacity-0 translate-y-4 -translate-x-1/2"
          : "opacity-100 translate-y-0 -translate-x-1/2"
      }`}
      style={{
        backgroundColor: "rgba(255,255,255,0.85)",
        backdropFilter: "saturate(1.8) blur(20px)",
        WebkitBackdropFilter: "saturate(1.8) blur(20px)",
      }}
    >
      <div className="w-2 h-2 rounded-full bg-[var(--color-cyan)] animate-ping" />
      <span className="text-sm font-medium text-[var(--color-ink)]">
        <strong>{lastAdded}</strong> agregado al carrito
      </span>
    </div>
  );
}
