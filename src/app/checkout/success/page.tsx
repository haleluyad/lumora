
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function CheckoutSuccessPage() {
  return (
    <ProtectedRoute>
      <main className="flex min-h-[70vh] items-center justify-center bg-[#faf9f6] px-5">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center">
          <div className="text-5xl">✓</div>
          <h1 className="mt-5 text-2xl font-semibold text-[#344a39]">
            Thank you for your order!
          </h1>
          <p className="mt-3 text-gray-600">
            Your demo order has been placed successfully.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-full bg-[#344a39] px-6 py-3 text-white"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    </ProtectedRoute>
  );
}
