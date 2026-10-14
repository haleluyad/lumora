
"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const { itemCount } = useCart();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    
  ];

  return (
    <header className="border-b border-gray-200 bg-white text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight text-[#344a39] dark:text-green-300"
        >
          Lumora
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:text-[#527457]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <Link href="/cart" className="text-sm hover:underline">
            Cart ({itemCount})
          </Link>

          {!isLoading &&
            (user ? (
              <>
                <Link href="/profile" className="text-sm hover:underline">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-sm hover:underline"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link href="/login" className="text-sm hover:underline">
                Sign in
              </Link>
            ))}
        </div>

        <button
          type="button"
          className="rounded-lg border px-3 py-2 text-sm md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t px-5 py-5 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <ThemeToggle />

          <Link href="/cart" onClick={() => setMenuOpen(false)}>
            Cart ({itemCount})
          </Link>

          {!isLoading &&
            (user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  className="text-left"
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
            ))}
        </nav>
      )}
    </header>
  );
}
