"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/login");
    } else if (user.role.toLowerCase() !== "admin") {
      router.replace("/profile");
    }
  }, [user, isLoading, router]);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] text-[#344a39] dark:bg-gray-950 dark:text-green-300">
        Checking administrator access...
      </main>
    );
  }

  if (!user || user.role.toLowerCase() !== "admin") {
    return null;
  }

  const links = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/categories", label: "Categories" },
    { href: "/admin/users", label: "Users" },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#faf9f6] text-[#252820] dark:bg-gray-950 dark:text-gray-100 md:flex">
        <aside className="w-full border-b border-[#e8e6df] bg-white p-5 dark:border-gray-800 dark:bg-gray-900 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
          <div className="mb-6">
            <Link
              href="/admin"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#78866b] dark:text-green-300"
            >
              Lumora
            </Link>

            <h2 className="mt-1 text-xl font-semibold text-[#344a39] dark:text-gray-100">
              Admin Panel
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Store management
            </p>
          </div>

          <nav
            aria-label="Admin navigation"
            className="flex flex-wrap gap-2 md:flex-col"
          >
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/admin" &&
                  pathname.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? "bg-[#344a39] text-white"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#e8e6df] pt-5 dark:border-gray-800 md:flex-col md:items-stretch">
            <Link
              href="/"
              className="rounded-lg px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              ← Back to Store
            </Link>

            <Link
              href="/profile"
              className="rounded-lg px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              My Profile
            </Link>

            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Theme
              </span>
              <ThemeToggle />
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg px-4 py-3 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
            >
              Sign out
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-6 md:p-10">{children}</main>
      </div>
    </ProtectedRoute>
  );
}

