import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchCategoryBySlug,
  fetchCategoryProducts,
} from "@/lib/products";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  try {
    const category = await fetchCategoryBySlug(slug);
    const products = await fetchCategoryProducts(category.id);

    return (
      <main className="min-h-screen bg-[#faf9f6] px-6 py-12 text-[#252820] dark:bg-gray-950 dark:text-gray-100 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/categories"
            className="text-sm text-[#52644c] hover:underline dark:text-[#b8c9a8]"
          >
            ← All categories
          </Link>

          <h1 className="mt-6 text-4xl font-medium tracking-tight">
            {category.name}
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Explore products in {category.name.toLowerCase()}.
          </p>

          {products.length === 0 ? (
            <p className="mt-10 text-gray-600 dark:text-gray-400">
              There are no products in this category yet.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group overflow-hidden rounded-2xl border border-[#e8e6df] bg-white transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
                >
                  <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
                   <img
  src={product.images?.[0] || "/placeholder.png"}
  alt={product.title}
  className="absolute inset-0 h-full w-full object-cover"
/>
                  </div>

                  <div className="p-5">
                    <h2 className="line-clamp-2 font-medium">
                      {product.title}
                    </h2>

                    <p className="mt-3 text-lg font-semibold text-[#52644c] dark:text-[#b8c9a8]">
                      ${product.price.toFixed(2)}
                    </p>

                    <span className="mt-4 inline-block text-sm text-gray-600 group-hover:underline dark:text-gray-400">
                      View product →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  } catch {
    notFound();
  }
}
