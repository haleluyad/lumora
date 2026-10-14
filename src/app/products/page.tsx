import { fetchProducts } from "@/lib/products";
import ProductBrowser from "./ProductBrowser";

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Discover Lumora
        </p>

        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
          Shop All Products
        </h1>

        <p className="mt-3 text-muted-foreground">
          Discover products selected for you.
        </p>
      </div>

      <ProductBrowser products={products} />
    </main>
  );
}
