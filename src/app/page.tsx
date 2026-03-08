import HeroScroll from "@/components/HeroScroll";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

export default function Home() {
  return (
    <>
      <Navbar />
      <CartDrawer />

      <main>
        {/* Hero — Canvas Scroll Animation */}
        <HeroScroll />

        {/* Products Section */}
        <section
          id="productos"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        >
          <div className="text-center mb-16">
            <AnimatedSection animation="blur-in">
              <p className="text-sm font-semibold tracking-widest uppercase text-[var(--color-cyan)] mb-2">
                Colección
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-ink)]">
                Piezas Únicas
              </h2>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={0.2}>
              <p className="mt-4 text-[var(--color-ink-soft)] max-w-lg mx-auto">
                Cada bolso es tejido a mano con dedicación artesanal. No hay dos
                piezas iguales — cada una cuenta su propia historia.
              </p>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="bg-[var(--color-bg-warm)] py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <AnimatedSection animation="blur-in">
                  <p className="text-sm font-semibold tracking-widest uppercase text-[var(--color-cyan)] mb-2">
                    Nuestra Historia
                  </p>
                </AnimatedSection>
                <AnimatedSection animation="fade-up" delay={0.1}>
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-ink)] mb-6">
                    De Nuestras Manos a las Tuyas
                  </h2>
                </AnimatedSection>
                <AnimatedSection animation="fade-up" delay={0.2}>
                  <div className="space-y-4 text-[var(--color-ink-soft)] leading-relaxed">
                    <p>
                      Wendy Sarmiento nace de la pasión por el tejido artesanal
                      y la elegancia contemporánea. Cada bolso es una pieza de
                      arte funcional, creada con materiales premium y técnicas
                      heredadas de generaciones de artesanas colombianas.
                    </p>
                    <p>
                      Nuestros diseños fusionan la tradición artesanal con
                      tendencias modernas, creando accesorios que cuentan
                      historias. Trabajamos con artesanas locales, asegurando
                      comercio justo y sostenibilidad en cada pieza.
                    </p>
                    <p>
                      Cada bolso toma entre 3 y 5 días de trabajo manual — un
                      proceso lento y deliberado que garantiza calidad
                      excepcional y un carácter verdaderamente único.
                    </p>
                  </div>
                </AnimatedSection>
              </div>
              <AnimatedSection animation="fade-right" delay={0.3} duration={1.2}>
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/10 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/products/bag1.webp"
                    alt="Artesanía tejida a mano"
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ocean)]/20 to-transparent" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Banner — Frosted glass with scroll materialize */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
