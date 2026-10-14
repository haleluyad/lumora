
"use client";

import { useEffect, useState, type FormEvent } from "react";

interface Category {
  id: number;
  name: string;
  image: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const inputClassName =
  "w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#78866b] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadCategories() {
    setLoading(true);
    setError("");

    try {
      if (!API_URL) {
        throw new Error("API URL is not configured.");
      }

      const response = await fetch(`${API_URL}/categories`);

      if (!response.ok) {
        throw new Error(`Failed to load categories (${response.status}).`);
      }

      const data: Category[] = await response.json();
      setCategories(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load categories."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function resetForm() {
    setEditingId(null);
    setName("");
    setImage("");
    setError("");
    setMessage("");
  }

  function startEditing(category: Category) {
    setEditingId(category.id);
    setName(category.name);
    setImage(category.image);
    setError("");
    setMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!name.trim() || !image.trim()) {
      setError("Please enter both a category name and image URL.");
      return;
    }

    try {
      const parsedUrl = new URL(image.trim());

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("Invalid URL protocol.");
      }
    } catch {
      setError("Please enter a valid HTTP or HTTPS image URL.");
      return;
    }

    if (!API_URL) {
      setError("API URL is not configured.");
      return;
    }

    setSaving(true);

    const isEditing = editingId !== null;

    try {
      const response = await fetch(
        isEditing
          ? `${API_URL}/categories/${editingId}`
          : `${API_URL}/categories`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            image: image.trim(),
          }),
        }
      );

      if (!response.ok) {
        const details = await response.text();
        throw new Error(
          `Category request failed (${response.status}): ${details}`
        );
      }

      setEditingId(null);
      setName("");
      setImage("");

      await loadCategories();

      setMessage(
        isEditing
          ? "Category updated successfully."
          : "Category created successfully."
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save category."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(category: Category) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    if (!API_URL) {
      setError("API URL is not configured.");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/categories/${category.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        const details = await response.text();
        throw new Error(`Delete failed (${response.status}): ${details}`);
      }

      if (editingId === category.id) {
        setEditingId(null);
        setName("");
        setImage("");
      }

      await loadCategories();
      setMessage("Category deleted successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete category."
      );
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-sm tracking-wide text-gray-500 dark:text-gray-400">
        LUMORA / ADMIN
      </p>

      <header className="mt-2">
        <h1 className="text-3xl font-semibold text-[#344a39] dark:text-green-300">
          Categories
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Create, edit, and organize your store categories.
        </p>
      </header>

      {message && (
        <p
          role="status"
          className="mt-5 rounded-lg bg-green-50 p-3 text-green-800 dark:bg-green-950 dark:text-green-300"
        >
          {message}
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="mt-5 break-words rounded-lg bg-red-50 p-3 text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </p>
      )}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {editingId !== null ? "Edit category" : "Add a category"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-5">
          <label className="grid gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Category name
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Home Decor"
              className={inputClassName}
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Image URL
            <input
              required
              type="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="https://example.com/category.jpg"
              className={inputClassName}
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving || loading}
              className="rounded-lg bg-[#344a39] px-5 py-3 font-medium text-white transition hover:bg-[#25372a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId !== null
                  ? "Save changes"
                  : "Create category"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-5 py-3 text-gray-800 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          All categories
        </h2>

        {loading ? (
          <p className="mt-5 text-gray-600 dark:text-gray-300">
            Loading categories...
          </p>
        ) : categories.length === 0 ? (
          <p className="mt-5 text-gray-600 dark:text-gray-300">
            No categories found.
          </p>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <table className="w-full min-w-[550px] text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <tr>
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-700 dark:text-gray-200">
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-gray-200 last:border-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    <td className="p-4">{category.id}</td>

                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                      {category.name}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => startEditing(category)}
                          className="font-medium text-blue-700 hover:underline dark:text-blue-400"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(category)}
                          className="font-medium text-red-700 hover:underline dark:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}


