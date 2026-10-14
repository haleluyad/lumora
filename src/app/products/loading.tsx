export default function ProductsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-4 h-8 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-square rounded-xl bg-gray-200 dark:bg-gray-700" />
            <div className="mt-4 h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-3 h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </main>
  );
}