import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <Link
            href="/"
            className="font-semibold text-[#344a39] dark:text-green-300"
          >
            Lumora
          </Link>
          <p className="text-sm">
            Thoughtful finds for your everyday life.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-5 text-sm"
        >
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/categories" className="hover:underline">
            Categories
          </Link>
          <Link href="/cart" className="hover:underline">
            Cart
          </Link>
        </nav>

        <p className="text-sm">
          © {new Date().getFullYear()} Lumora. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
