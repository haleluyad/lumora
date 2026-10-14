
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isHydrated: boolean;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "lumora-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load the saved cart when the application opens.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (savedCart) {
        const parsed: unknown = JSON.parse(savedCart);

        if (Array.isArray(parsed)) {
          const validItems = parsed.filter(
            (item): item is CartItem =>
              item !== null &&
              typeof item === "object" &&
              "product" in item &&
              "quantity" in item &&
              typeof item.quantity === "number" &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0 &&
              item.product !== null &&
              typeof item.product === "object" &&
              "id" in item.product &&
              typeof item.product.id === "number" &&
              "title" in item.product &&
              typeof item.product.title === "string" &&
              "price" in item.product &&
              typeof item.product.price === "number"
          );

          setItems(validItems);
        }
      }
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save cart changes after the saved cart has loaded.
  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      console.error("Unable to save the cart in this browser.");
    }
  }, [items, isHydrated]);

  const addToCart = useCallback((product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (!Number.isInteger(quantity) || quantity < 1) return;

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    },
    []
  );

  const removeFromCart = useCallback((productId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        isHydrated,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}
