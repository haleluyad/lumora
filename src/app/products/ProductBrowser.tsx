
"use client";

import { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Product } from "@/lib/products";

interface ProductBrowserProps {
  products: Product[];
}

export default function ProductBrowser({
  products,
}: ProductBrowserProps) {
  const router = useRouter();
const pathname = usePathname();
const searchParams = useSearchParams();

const [search, setSearch] = useState(searchParams.get("search") ?? "");
const [category, setCategory] = useState(searchParams.get("category") ?? "all");
const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");
const [sortBy, setSortBy] = useState(searchParams.get("sort") ?? "default");
useEffect(() => {
  const params = new URLSearchParams();

  if (search.trim()) params.set("search", search.trim());
  if (category !== "all") params.set("category", category);
  if (minPrice !== "") params.set("minPrice", minPrice);
  if (maxPrice !== "") params.set("maxPrice", maxPrice);
  if (sortBy !== "default") params.set("sort", sortBy);

  const query = params.toString();
  const newUrl = query ? `${pathname}?${query}` : pathname;

  router.replace(newUrl, { scroll: false });
}, [search, category, minPrice, maxPrice, sortBy, pathname, router]);
useEffect(() => {
  setSearch(searchParams.get("search") ?? "");
  setCategory(searchParams.get("category") ?? "all");
  setMinPrice(searchParams.get("minPrice") ?? "");
  setMaxPrice(searchParams.get("maxPrice") ?? "");
  setSortBy(searchParams.get("sort") ?? "default");
}, [searchParams]);

  const categories = useMemo(() => {
    const uniqueCategories = new Map<number, string>();

    products.forEach((product) => {
      if (product.category) {
        uniqueCategories.set(
          product.category.id,
          product.category.name
        );
      }
    });

    return Array.from(uniqueCategories, ([id, name]) => ({
      id,
      name,
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCategory =
        category === "all" ||
        String(product.category?.id) === category;

      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);

      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.creationAt ?? 0).getTime() -
            new Date(a.creationAt ?? 0).getTime()
        );
        break;
    }

    return result;
  }, [products, search, category, minPrice, maxPrice, sortBy]);

  return (
    <div>
      <div className="grid gap-4 rounded-2xl border border-[#e5e3da] bg-white p-5 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-4">
          <label
            htmlFor="product-search"
            className="mb-2 block text-sm font-medium"
          >
            Search products
          </label>
          <input
            id="product-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by product name..."
            className="h-11 w-full rounded-lg border border-[#d9d8cf] bg-white px-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-[#344a39] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="category-filter"
            className="mb-2 block text-sm font-medium"
          >
            Category
          </label>
          <select
            id="category-filter"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-11 w-full rounded-lg border border-[#d9d8cf] bg-white px-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item.id} value={String(item.id)}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="min-price"
            className="mb-2 block text-sm font-medium"
          >
            Minimum price ($)
          </label>
          <input
            id="min-price"
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            placeholder="No minimum"
            className="h-11 w-full rounded-lg border border-[#d9d8cf] bg-white px-3 text-sm text-gray-900 placeholder:text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"></input>
        </div>

        <div>
          <label
            htmlFor="max-price"
            className="mb-2 block text-sm font-medium"
          >
            Maximum price ($)
          </label>
          <input
            id="max-price"
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            placeholder="No maximum"
            className="h-11 w-full rounded-lg border border-[#d9d8cf] bg-white px-3 text-sm text-gray-900 placeholder:text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="sort-products"
            className="mb-2 block text-sm font-medium"
          >
            Sort by
          </label>
          <select
            id="sort-products"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="h-11 w-full rounded-lg border border-[#d9d8cf] bg-white px-3 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="default">Default order</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name: A to Z</option>
            <option value="newest">Newest first</option>
          </select>
        </div>

        <div className="flex items-end sm:col-span-2 lg:col-span-4">
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("all");
              setMinPrice("");
              setMaxPrice("");
              setSortBy("default");
            }}
            className="text-sm font-medium text-[#344a39] underline underline-offset-4 hover:opacity-80 dark:text-green-300"
          >
            Clear all filters
          </button>
        </div>
      </div>

      <p className="my-6 text-sm text-muted-foreground" aria-live="polite">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#d9d8cf] py-16 text-center">
          <h2 className="text-xl font-semibold">
            No products found
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try another search or adjust your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                <img
  src={product.images?.[0] || "/file.svg"}
  alt={product.title}
  loading="lazy"
  onError={(event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = "/file.svg";
  }}
  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
/>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                {product.category?.name}
              </p>

              <h2 className="mt-1 line-clamp-2 text-sm font-medium">
                {product.title}
              </h2>

              <p className="mt-2 text-sm font-semibold">
                ${product.price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
