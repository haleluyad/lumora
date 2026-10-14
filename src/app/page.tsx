import Image from "next/image";
import Link from "next/link";
import { fetchCategories } from "@/lib/products";

export default async function Home() {
  const categories = await fetchCategories().catch(() => []);
  console.log("Homepage category image:", categories[0]?.image);

  return (
    <main className="bg-[#faf9f6] text-[#252820] dark:bg-gray-950 dark:text-gray-100">
      {/* Hero */}
      <section className="grid items-center gap-10 px-6 py-14 md:grid-cols-2 md:px-12 md:py-20">
        <div className="max-w-xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#78866b]">
            Thoughtfully chosen, beautifully yours
          </p>

          <h1 className="text-5xl font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Find your
            <br />
            everyday{" "}
            <span className="font-serif italic text-[#78866b]">
              favorite.
            </span>
          </h1>

          <p className="mt-6 max-w-md leading-7 text-gray-600 dark:text-gray-400">
            Discover pieces for your life, your space, and everything in
            between. A little inspiration for every day.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#344a39] px-7 text-sm font-medium text-white transition-colors hover:bg-[#26392b]"
            >
              Explore the Collection
            </Link>

            <Link
              href="/categories"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#d9d8cf] px-7 text-sm font-medium transition-colors hover:bg-[#d9d8cf]/20 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Browse Categories
            </Link>
          </div>

          <p className="mt-8 text-xs tracking-wide text-gray-500 dark:text-gray-400">
            YOUR STYLE. YOUR SPACE. YOUR LUMORA.
          </p>
        </div>

        {/* Product-focused visual */}
        <Link
          href="/products"
          className="group relative min-h-[300px] overflow-hidden rounded-[2rem] bg-[#e9e8dd] dark:bg-gray-800 md:min-h-[380px]"
          aria-label="Explore the Lumora product collection"
        >
          
<Image
  src="/images/lumora-hero.svg"
  alt="Discover Lumora — thoughtfully selected lifestyle products"
  fill
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover transition duration-500 group-hover:scale-105"
/>


          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-20 text-white">
            <p className="text-xs uppercase tracking-[0.2em]">
              Discover Lumora
            </p>
            <p className="mt-2 text-2xl font-medium">
              Thoughtful finds for everyday life
            </p>
          </div>
        </Link>
      </section>

      {/* Categories */}
      <section className="px-6 pb-16 md:px-12 md:pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#78866b]">
              Start exploring
            </p>
            <h2 className="mt-2 text-3xl font-medium tracking-tight">
              Popular Categories
            </h2>
          </div>

          <Link
            href="/categories"
            className="text-sm underline underline-offset-4 hover:text-[#78866b]"
          >
            All categories
          </Link>
        </div>

        {categories.length === 0 ? (
          <p className="rounded-xl border border-[#e8e6df] p-6 text-gray-600 dark:border-gray-700 dark:text-gray-400">
            Categories are temporarily unavailable. Please try again later.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group rounded-2xl border border-[#e8e6df] bg-white p-5 transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 sm:p-7"
              >
                <span className="text-xs text-[#78866b]">
                  {String(category.id).padStart(2, "0")}
                </span>

                <h3 className="mt-8 text-xl font-medium">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Explore products in this category.
                </p>

                <span className="mt-5 inline-block text-sm text-[#52644c] transition group-hover:translate-x-1 dark:text-[#b8c9a8]">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
