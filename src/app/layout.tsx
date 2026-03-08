import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Wendy Sarmiento | Bolsos Tejidos de Lujo",
  description:
    "Descubre bolsos artesanales tejidos a mano en Colombia. Piezas únicas de lujo con técnicas heredadas de generaciones. Envío a toda Colombia y el mundo.",
  keywords: [
    "bolsos tejidos",
    "bolsos artesanales",
    "bolsos de lujo",
    "bolsos colombianos",
    "handwoven bags",
    "luxury bags",
    "Wendy Sarmiento",
  ],
  authors: [{ name: "Wendy Sarmiento" }],
  openGraph: {
    title: "Wendy Sarmiento | Bolsos Tejidos de Lujo",
    description:
      "Bolsos artesanales tejidos a mano en Colombia. Cada pieza es única.",
    type: "website",
    locale: "es_CO",
    siteName: "Wendy Sarmiento",
    images: [
      {
        url: "/products/bag1.webp",
        width: 800,
        height: 800,
        alt: "Bolso artesanal tejido a mano — Wendy Sarmiento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wendy Sarmiento | Bolsos Tejidos de Lujo",
    description:
      "Bolsos artesanales tejidos a mano en Colombia. Piezas únicas de lujo.",
    images: ["/products/bag1.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
