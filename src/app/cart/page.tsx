
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    isHydrated,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!isHydrated) {
    return (
      <main className="mx-auto w-full max-w-5xl px-6 py-16">
        <p className="text-muted-foreground">Loading your cart...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Lumora
          </p>

          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
            Your Cart
          </h1>

          <p className="mt-2 text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <h2 className="text-xl font-medium">Your cart is waiting</h2>

          <p className="mt-3 text-muted-foreground">
            Explore our collection and find something you love.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#344a39] px-7 text-sm font-medium text-white transition-colors hover:bg-[#26392b]"
          >
            Explore products
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <section className="space-y-6">
            {items.map(({ product, quantity }) => (
              <article
                key={product.id}
                className="flex gap-5 border-b border-border pb-6"
              >
                <div className="h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-40 sm:w-36">
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {product.category?.name ?? "Lumora Collection"}
                  </p>

                  <h2 className="mt-2 font-medium">{product.title}</h2>

                  <p className="mt-2 font-medium">
                    ${(product.price * quantity).toFixed(2)}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                    <div className="flex items-center rounded-full border border-border">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${product.title}`}
                        disabled={quantity <= 1}
                        onClick={() =>
                          updateQuantity(product.id, quantity - 1)
                        }
                        className="px-3 py-2 disabled:opacity-40"
                      >
                        −
                      </button>

                      <span className="min-w-8 text-center text-sm">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        aria-label={`Increase quantity of ${product.title}`}
                        onClick={() =>
                          updateQuantity(product.id, quantity + 1)
                        }
                        className="px-3 py-2"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-2xl bg-[#f5f3ed] p-6 text-[#26392b]">
            <h2 className="text-lg font-semibold">Order summary</h2>

            <div className="mt-6 flex justify-between gap-4 text-sm">
              <span>Items ({itemCount})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="mt-4 flex justify-between gap-4 text-sm">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="my-6 h-px bg-[#d8ddd5]" />

            <div className="flex justify-between gap-4 font-semibold">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <p className="mt-3 text-xs text-[#5c6b5e]">
              Shipping and any applicable taxes are not included.
            </p>

            <Link
              href="/checkout"
              className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#344a39] px-5 text-sm font-medium text-white transition-colors hover:bg-[#26392b]"
            >
              Proceed to checkout
            </Link>

            <Link
              href="/products"
              className="mt-4 block text-center text-sm underline underline-offset-4"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
