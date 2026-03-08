"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Product, useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addItem, formatPrice } = useCartStore();
  const cardRef = useRef<HTMLElement>(null);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  useEffect(() => {
    async function animate() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!cardRef.current) return;

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 80, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    }
    animate();
  }, [index]);

  return (
    <article
      ref={cardRef}
      className="group cursor-pointer opacity-0"
      style={{ perspective: "1000px" }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--color-bg-warm)] mb-4 shadow-lg shadow-black/5 group-hover:shadow-xl group-hover:shadow-black/10 transition-shadow duration-500">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:animate-[img-pulse_2.5s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Add to cart overlay button — always visible on mobile, hover-only on desktop */}
        <button
          onClick={handleAdd}
          className={`absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 py-3 backdrop-blur-sm text-sm font-semibold rounded-xl transition-all duration-300 active:scale-95 ${
            added
              ? "bg-[var(--color-cyan)] text-white opacity-100 translate-y-0 shadow-lg shadow-[var(--color-cyan)]/25"
              : "bg-white/90 text-[var(--color-ink)] opacity-100 translate-y-0 lg:opacity-0 lg:translate-y-3 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 hover:bg-[var(--color-ocean)] hover:text-white hover:shadow-lg hover:shadow-[var(--color-ocean)]/30"
          }`}
        >
          {added ? "Agregado" : "Agregar al carrito"}
        </button>
      </div>

      {/* Info */}
      <div className="px-1">
        <h3 className="text-base font-semibold text-[var(--color-ink)] mb-1 group-hover:text-[var(--color-ocean)] transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mb-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-lg font-bold text-[var(--color-ocean)]">
          {formatPrice(product.priceCOP, product.priceUSD)}
        </p>
      </div>
    </article>
  );
}
