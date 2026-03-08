import Image from "next/image";
import HeroScroll from "@/components/HeroScroll";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";
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
      <Toast />

      <main>
        {/* Hero — Canvas Scroll Animation */}
        <HeroScroll />

        {/* Custom Orders — before the catalog */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <AnimatedSection animation="fade-up">
                <div>
                  <p className="text-sm font-semibold tracking-widest uppercase text-[var(--color-cyan)] mb-2">
                    Hecho para ti
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-ink)] mb-5">
                    Diseñamos Tu Bolso Ideal
                  </h2>
                  <p className="text-[var(--color-ink-soft)] leading-relaxed mb-4">
                    ¿No encuentras exactamente lo que buscas? Creamos bolsos a
                    pedido, adaptados a tu estilo, colores y tamaño. Cuéntanos
                    tu idea y la hacemos realidad.
                  </p>
                  <ul className="space-y-2.5 text-sm text-[var(--color-ink-soft)]">
                    <li className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center text-[var(--color-cyan)] text-xs">✓</span>
                      Elige colores, materiales y diseño
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center text-[var(--color-cyan)] text-xs">✓</span>
                      Entrega en 5–7 días hábiles
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center text-[var(--color-cyan)] text-xs">✓</span>
                      Asesoría personalizada por WhatsApp
                    </li>
                  </ul>
                  <a
                    href="https://wa.me/573006313294?text=Hola%20Wendy!%20Me%20gustar%C3%ADa%20hacer%20un%20pedido%20personalizado."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 mt-6 px-6 py-3.5 w-full sm:w-auto bg-[var(--color-ocean)] text-white font-semibold rounded-xl transition-all duration-300 hover:bg-[var(--color-ocean)]/90 hover:shadow-lg hover:shadow-[var(--color-ocean)]/20 hover:scale-105 active:scale-95"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Pedir mi bolso personalizado
                  </a>
                </div>
              </AnimatedSection>
              <AnimatedSection animation="fade-right" delay={0.2} duration={1.2}>
                <div className="relative aspect-[4/3] md:aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
                  <Image
                    src="/products/bag3.webp"
                    alt="Bolso personalizado a pedido"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ocean)]/15 to-transparent" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section
          id="productos"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24"
        >
          <div className="text-center mb-10 md:mb-16">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="sobre" className="bg-[var(--color-bg-warm)] py-14 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
                  <Image
                    src="/products/bag1.webp"
                    alt="Artesanía tejida a mano"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
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
