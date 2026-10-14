"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email.trim(), password);

      const returnTo = searchParams.get("returnTo");
      const destination =
        returnTo && returnTo.startsWith("/") && !returnTo.startsWith("//")
          ? returnTo
          : "/profile";

      router.push(destination);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-6 py-12 text-[#252820] dark:bg-gray-950 dark:text-gray-100">
      <div className="w-full max-w-md rounded-3xl border border-[#e8e6df] bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-10">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight dark:text-gray-100"
        >
          lumora<span className="text-[#78866b] dark:text-green-300">.</span>
        </Link>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#78866b] dark:text-green-300">
          Welcome back
        </p>

        <h1 className="mt-2 text-3xl font-medium">
          Sign in to Lumora
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#77786f] dark:text-gray-400">
          Sign in to continue your shopping journey.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="h-12 w-full rounded-xl border border-[#d9d8cf] bg-white px-4 text-gray-900 placeholder:text-gray-500 outline-none focus:border-[#78866b] focus:ring-2 focus:ring-[#78866b]/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="h-12 w-full rounded-xl border border-[#d9d8cf] bg-white px-4 text-gray-900 placeholder:text-gray-500 outline-none focus:border-[#78866b] focus:ring-2 focus:ring-[#78866b]/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-full bg-[#344a39] px-6 text-sm font-medium text-white transition-colors hover:bg-[#26392b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#77786f] dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-[#344a39] underline underline-offset-4 dark:text-green-300"
          >
            Create one
          </Link>
        </p>

        <p className="mt-6 text-center text-sm text-[#77786f] dark:text-gray-400">
          <Link
            href="/"
            className="transition-colors hover:text-[#344a39] dark:hover:text-green-300"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] text-[#344a39] dark:bg-gray-950 dark:text-green-300">
          Loading sign-in page...
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

