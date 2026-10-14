import Link from "next/link";
import Image from "next/image";
import { fetchCategories } from "@/lib/products";

export default async function CategoriesPage() {
  let categories;

  try {
    categories = await fetchCategories();
  } catch {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#faf9f6] px-6 text-center dark:bg-gray-950">
        <h1 className="text-3xl font-semibold text-[#344a39] dark:text-gray-100">
          Categories
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          We couldn't load categories. Please try again later.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-12 text-[#252820] dark:bg-gray-950 dark:text-gray-100 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#78866b]">
          Discover Lumora
        </p>

        <h1 className="mt-3 text-4xl font-medium tracking-tight">
          Explore Categories
        </h1>

        <p className="mt-4 max-w-xl text-gray-600 dark:text-gray-400">
          Find thoughtful pieces for your everyday life, from personal
          essentials to items for your home.
        </p>

        {categories.length === 0 ? (
          <p className="mt-10 text-gray-600 dark:text-gray-400">
            No categories are available right now.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group overflow-hidden rounded-2xl border border-[#e8e6df] bg-white transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-medium">
                    {category.name}
                  </h2>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Explore products in this category.
                  </p>

                  <span className="mt-5 inline-block text-sm font-medium text-[#52644c] dark:text-[#b8c9a8]">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
