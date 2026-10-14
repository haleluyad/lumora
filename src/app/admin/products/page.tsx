
"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type Product,
  type Category,
  type ProductInput,
} from "@/lib/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const emptyForm: ProductInput = {
  title: "",
  price: 0,
  description: "",
  categoryId: 1,
  images: [""],
};

const inputClassName =
  "w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#78866b] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<ProductInput>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [productData, categoryResponse] = await Promise.all([
        fetchProducts(),
        fetch(`${API_URL}/categories`),
      ]);

      if (!categoryResponse.ok) {
        throw new Error("Unable to load categories.");
      }

      const categoryData: Category[] = await categoryResponse.json();
      setProducts(productData);
      setCategories(categoryData);
    } catch {
      setError("Unable to load products or categories. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function startEditing(product: Product) {
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.category.id,
      images: product.images?.length ? product.images : [""],
    });
    setMessage("");
    setError("");
  }

  function resetForm() {
    setEditingId(null);
    setForm({ ...emptyForm, images: [""] });
    setError("");
    setMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const wasEditing = editingId !== null;

    const input: ProductInput = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      categoryId: Number(form.categoryId),
      images: form.images.filter((image) => image.trim() !== ""),
    };

    try {
      if (!input.title || !input.description) {
        throw new Error("Please enter a title and description.");
      }

      if (!Number.isFinite(input.price) || input.price <= 0) {
        throw new Error("Price must be greater than zero.");
      }

      if (!input.categoryId) {
        throw new Error("Please select a category.");
      }

      if (input.images.length === 0) {
        throw new Error("Please enter an image URL.");
      }

      if (wasEditing && editingId !== null) {
        await updateProduct(editingId, input);
      } else {
        await createProduct(input);
      }

      setEditingId(null);
      setForm({ ...emptyForm, images: [""] });

      await loadData();

      setMessage(
        wasEditing
          ? "Product updated successfully."
          : "Product created successfully."
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save product."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.title}"?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      await deleteProduct(product.id);

      setProducts((current) =>
        current.filter((item) => item.id !== product.id)
      );

      if (editingId === product.id) {
        setEditingId(null);
        setForm({ ...emptyForm, images: [""] });
      }

      setMessage("Delete request completed.");
    } catch {
      setError("Unable to delete this product. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-sm tracking-wide text-gray-500 dark:text-gray-400">
        LUMORA / ADMIN
      </p>

      <header className="mt-2">
        <h1 className="text-3xl font-semibold text-[#344a39] dark:text-green-300">
          Products
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Create, edit, and manage store products.
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
          className="mt-5 rounded-lg bg-red-50 p-3 text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {error}
        </p>
      )}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {editingId !== null ? "Edit product" : "Add a product"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-5 grid gap-5 sm:grid-cols-2"
        >
          <label className="grid gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Product title
            <input
              required
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className={inputClassName}
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Price
            <input
              required
              type="number"
              min="0.01"
              step="0.01"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              className={inputClassName}
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 sm:col-span-2">
            Description
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={inputClassName}
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Category
            <select
              required
              value={form.categoryId}
              onChange={(e) =>
                setForm({
                  ...form,
                  categoryId: Number(e.target.value),
                })
              }
              className={inputClassName}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Image URL
            <input
              required
              type="url"
              value={form.images[0] ?? ""}
              onChange={(e) =>
                setForm({ ...form, images: [e.target.value] })
              }
              placeholder="https://example.com/image.jpg"
              className={inputClassName}
            />
          </label>

          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={saving || loading || categories.length === 0}
              className="rounded-lg bg-[#344a39] px-5 py-3 font-medium text-white transition hover:bg-[#25372a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId !== null
                  ? "Save changes"
                  : "Create product"}
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
          All products
        </h2>

        {loading ? (
          <p className="mt-5 text-gray-600 dark:text-gray-300">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p className="mt-5 text-gray-600 dark:text-gray-300">
            No products found.
          </p>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <tr>
                  <th className="p-4 font-semibold">Product</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-700 dark:text-gray-200">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 last:border-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                      {product.title}
                    </td>
                    <td className="p-4">
                      {product.category?.name ?? "—"}
                    </td>
                    <td className="p-4">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="p-4">{product.id}</td>
                    <td className="p-4">
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => startEditing(product)}
                          className="font-medium text-blue-700 hover:underline dark:text-blue-400"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(product)}
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


