
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, subtotal, clearCart, isHydrated } = useCart();

  const [error, setError] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setPlacingOrder(true);

    // This capstone simulates an order; no payment is processed.
    clearCart();
    router.push("/checkout/success");
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#faf9f6] px-5 py-12 text-[#303b30]">
        <div className="mx-auto max-w-5xl">
          
          <h1 className="mt-6 text-3xl font-semibold">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Complete your delivery details to place your order.
          </p>

          {!isHydrated ? (
            <p className="mt-8">Loading your cart...</p>
          ) : items.length === 0 ? (
            <div className="mt-8 rounded-2xl bg-white p-6">
              <p>Your cart is empty.</p>
              <Link href="/products" className="mt-4 inline-block underline">
                Browse products
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl bg-white p-6"
              >
                <h2 className="text-xl font-medium">Delivery information</h2>

                <label className="block text-sm">
                  Full name
                  <input
                    name="fullName"
                    defaultValue={user?.name ?? ""}
                    required
                    minLength={2}
                    className="mt-2 w-full rounded-lg border p-3"
                    placeholder="Your full name"
                  />
                </label>

                <label className="block text-sm">
                  Email
                  <input
                    name="email"
                    type="email"
                    defaultValue={user?.email ?? ""}
                    required
                    className="mt-2 w-full rounded-lg border p-3"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="block text-sm">
                  Phone number
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="mt-2 w-full rounded-lg border p-3"
                    placeholder="Your phone number"
                  />
                </label>

                <label className="block text-sm">
                  Delivery address
                  <textarea
                    name="address"
                    required
                    minLength={5}
                    className="mt-2 w-full rounded-lg border p-3"
                    placeholder="Street, area, and delivery details"
                    rows={3}
                  />
                </label>

                <label className="block text-sm">
                  City
                  <input
                    name="city"
                    required
                    className="mt-2 w-full rounded-lg border p-3"
                    placeholder="Your city"
                  />
                </label>

                {error && (
                  <p role="alert" className="text-sm text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={placingOrder}
                  className="w-full rounded-full bg-[#344a39] px-5 py-3 text-white hover:bg-[#26392b] disabled:opacity-60"
                >
                  {placingOrder ? "Placing order..." : "Place order"}
                </button>

                <p className="text-xs text-gray-500">
                  Demo checkout only. No payment will be collected.
                </p>
              </form>

              <section className="h-fit rounded-2xl bg-white p-6">
                <h2 className="text-xl font-medium">Order summary</h2>

                <div className="mt-5 space-y-4">
                  {items.map((item) => (
                    
<div
  key={item.product.id}
  className="flex justify-between gap-4 text-sm"
>
  <span>
    {item.product.title} × {item.quantity}
  </span>
  <span>
    ${(item.product.price * item.quantity).toFixed(2)}
  </span>
</div>

                  ))}
                </div>

                <div className="mt-6 flex justify-between border-t pt-4 font-semibold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
