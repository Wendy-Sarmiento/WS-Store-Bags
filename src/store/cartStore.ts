import { create } from "zustand";

export interface Product {
  id: string;
  name: string;
  priceCOP: number;
  priceUSD: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  currency: "COP" | "USD";
  open: () => void;
  close: () => void;
  toggle: () => void;
  toggleCurrency: () => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  totalItems: () => number;
  totalPrice: () => number;
  formatPrice: (cop: number, usd: number) => string;
  whatsappCheckoutUrl: () => string;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  currency: "COP",

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  toggleCurrency: () =>
    set((s) => ({ currency: s.currency === "COP" ? "USD" : "COP" })),

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.product.id !== productId) };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === productId ? { ...i, quantity } : i
        ),
      };
    }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () => {
    const { items, currency } = get();
    return items.reduce(
      (sum, i) =>
        sum +
        i.quantity *
          (currency === "COP" ? i.product.priceCOP : i.product.priceUSD),
      0
    );
  },

  formatPrice: (cop, usd) => {
    const { currency } = get();
    if (currency === "COP") {
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
      }).format(cop);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(usd);
  },

  whatsappCheckoutUrl: () => {
    const { items, currency, totalPrice } = get();
    if (items.length === 0) return "#";

    const total = totalPrice();
    const currencyLabel = currency;
    const itemLines = items
      .map((i) => {
        const price =
          currency === "COP" ? i.product.priceCOP : i.product.priceUSD;
        return `• ${i.product.name} x${i.quantity} — ${currencyLabel} ${price.toLocaleString()}`;
      })
      .join("\n");

    const message = encodeURIComponent(
      `¡Hola Wendy! 👋 Me gustaría ordenar:\n\n${itemLines}\n\n*Total: ${currencyLabel} ${total.toLocaleString()}*\n\n¿Está disponible?`
    );

    return `https://wa.me/573006313294?text=${message}`;
  },
}));
