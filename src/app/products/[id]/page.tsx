
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProduct, fetchProducts } from "@/lib/products";
import AddToCartButton from "@/components/product/AddToCartButton";
import type { Metadata } from "next";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}
export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await fetchProduct(id);

    return {
      title: product.title,
      description: product.description,
    };
  } catch {
    return {
      title: "Product Not Found",
      description: "This product could not be found.",
    };
  }
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  let product;

  try {
    product = await fetchProduct(id);
  } catch {
    notFound();
  }
  const allProducts = await fetchProducts();

const relatedProducts = allProducts
  .filter(
    (item) =>
      item.category?.id === product.category?.id &&
      item.id !== product.id
  )
  .slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
    
      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-muted">
          

<img
  src={product.images?.[0] || "/file.svg"}
  alt={product.title}
  className="h-full w-full object-cover"
/>


        </div>

        <div className="flex flex-col items-start justify-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            {product.category?.name ?? "Lumora Collection"}
          </p>

          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
            {product.title}
          </h1>

          <p className="mt-5 text-2xl font-medium">
            ${product.price.toFixed(2)}
          </p>

          <div className="my-8 h-px w-full bg-border" />

          <h2 className="text-lg font-medium">Product description</h2>

          <p className="mt-3 leading-7 text-muted-foreground">
            {product.description || "No description is available yet."}
          </p>

          <AddToCartButton product={product} />

     <Link
       href="/products"
       className="mt-3 inline-flex h-12 items-center justify-center rounded-full border border-[#344a39] px-7 text-sm font-medium text-[#344a39] transition-colors hover:bg-[#f2f0e8] dark:border-green-300 dark:text-green-300 dark:hover:bg-gray-800"
    >
       Continue shopping
     </Link>
        </div>
            </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-semibold">
            You May Also Like
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            More finds from the same category.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                  
<img
  src={item.images?.[0] || "/file.svg"}
  alt={item.title}
  loading="lazy"
  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
/>

                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  {item.category?.name}
                </p>

                <h3 className="mt-1 line-clamp-2 text-sm font-medium">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm font-semibold">
                  ${item.price.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
