"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { registerUser } from "@/lib/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Your password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const user = await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      setMessage(
        `Welcome to Lumora, ${user.name}! Your account has been created.`
      );

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClassName =
    "h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-[#78866b]";

  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-16 text-[#252820] dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight dark:text-gray-100"
          >
            lumora<span className="text-[#78866b] dark:text-green-300">.</span>
          </Link>

          <p className="mt-8 text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Welcome to Lumora
          </p>

          <h1 className="mt-3 text-3xl font-semibold">
            Create your account
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            Join us and find your everyday favorites.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium"
            >
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClassName}
              placeholder="Your full name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClassName}
              placeholder="you@example.com"
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
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClassName}
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={inputClassName}
              placeholder="Enter your password again"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="text-sm text-red-600 dark:text-red-400"
            >
              {error}
            </p>
          )}

          {message && (
            <p
              role="status"
              className="text-sm text-green-700 dark:text-green-300"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-full bg-[#344a39] px-6 text-sm font-medium text-white transition-colors hover:bg-[#26392b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#344a39] underline underline-offset-4 hover:opacity-80 dark:text-green-300"
          >
            Sign in
          </Link>
        </p>

        <p className="mt-5 text-center text-sm">
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-[#344a39] dark:hover:text-green-300"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
