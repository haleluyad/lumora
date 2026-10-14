"use client";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 text-center">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>

      <p className="mt-3 text-gray-600 dark:text-gray-300">
        We couldn&apos;t load the products. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900"
      >
        Try again
      </button>
    </main>
  );
}