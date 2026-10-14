"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-[#faf9f6] px-6 py-16 text-[#252820] dark:bg-gray-950 dark:text-gray-100">
        <div className="mx-auto max-w-2xl">
          <Link href="/"className="text-2xl font-semibold tracking-tight dark:text-gray-100">
            lumora<span className="text-[#78866b]">.</span>
          </Link>

          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#78866b]">
            Your account
          </p>

          <h1 className="mt-2 text-4xl font-medium">My Profile</h1>

          <section className="mt-8 rounded-3xl border border-[#e8e6df] bg-white p-8 dark:border-gray-700 dark:bg-gray-900">
            {user?.avatar && (
              <img
                src={user.avatar}
                alt=""
                className="h-20 w-20 rounded-full object-cover"
              />
            )}

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm text-[#77786f] dark:text-gray-400">Full name</p>
                <p className="mt-1 font-medium">{user?.name}</p>
              </div>

              <div>
                <p className="text-sm text-[#77786f] dark:text-gray-400">Email address</p>
                <p className="mt-1 font-medium">{user?.email}</p>
              </div>

              <div>
                <p className="text-sm text-[#77786f] dark:text-gray-400">Account role</p>
                <p className="mt-1 font-medium capitalize">{user?.role}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-8 rounded-full border border-[#d9d8cf] px-6 py-3 text-sm font-medium transition-colors hover:bg-[#f4f2ec] dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Sign out
            </button>
          </section>

          <Link
            href="/products"
           className="mt-6 inline-block text-sm underline underline-offset-4 hover:text-[#78866b] dark:text-green-300 dark:hover:text-green-200"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    </ProtectedRoute>
  );
}