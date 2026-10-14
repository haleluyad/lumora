"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
  }

  return (
    <div className="mt-6 w-full">
      <label
        htmlFor="product-quantity"
        className="mb-2 block text-sm font-medium"
      >
        Quantity
      </label>

      <div className="flex h-12 w-36 items-center rounded-full border border-[#d9d8cf]">
        <button
          type="button"
          onClick={() => {
            setQuantity((current) => Math.max(1, current - 1));
            setAdded(false);
          }}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className="h-full flex-1 rounded-l-full disabled:opacity-40"
        >
          −
        </button>

        <input
          id="product-quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(event) => {
            const value = Number(event.target.value);
            if (Number.isInteger(value) && value >= 1) {
              setQuantity(value);
              setAdded(false);
            }
          }}
          className="w-12 bg-transparent text-center outline-none"
        />

        <button
          type="button"
          onClick={() => {
            setQuantity((current) => current + 1);
            setAdded(false);
          }}
          aria-label="Increase quantity"
          className="h-full flex-1 rounded-r-full"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#344a39] px-7 text-sm font-medium text-white transition-colors hover:bg-[#26392b]"
      >
        {added ? `Added ${quantity} to cart ✓` : "Add to Cart"}
      </button>
    </div>
  );
}

