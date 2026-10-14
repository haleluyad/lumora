
import Link from "next/link";

const sections = [
  {
    title: "Products",
    description:
      "Add new products, update product details, and manage your store's catalog.",
    href: "/admin/products",
    action: "Manage products",
    icon: "package",
  },
  {
    title: "Categories",
    description:
      "Organize your store by creating and maintaining product categories.",
    href: "/admin/categories",
    action: "Manage categories",
    icon: "layers",
  },
  {
    title: "Users",
    description:
      "View registered users and inspect their account details.",
    href: "/admin/users",
    action: "Manage users",
    icon: "users",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-sm tracking-wide text-gray-500 dark:text-gray-400">
        LUMORA / ADMIN
      </p>

      <header className="mt-3">
        <h1 className="text-3xl font-semibold text-[#344a39] dark:text-green-300">
          Dashboard overview
        </h1>

        <p className="mt-3 leading-6 text-gray-600 dark:text-gray-300">
          Welcome to your store management dashboard. Choose a section
          below to manage your store.
        </p>
      </header>

      <section className="mt-9">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Store management
        </h2>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group flex min-h-56 flex-col rounded-2xl border border-gray-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-[#78866b] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#78866b] dark:border-gray-700 dark:bg-gray-900 dark:hover:border-green-400 dark:hover:bg-gray-800"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#edf0e9] text-[#344a39] dark:bg-gray-800 dark:text-green-300">
                {section.icon === "package" && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-6 w-6"
                  >
                    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
                    <path d="M3 8v9l9 5 9-5V8M12 13v9" />
                  </svg>
                )}

                {section.icon === "layers" && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-6 w-6"
                  >
                    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
                    <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
                  </svg>
                )}

                {section.icon === "users" && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-6 w-6"
                  >
                    <circle cx="9" cy="8" r="3" />
                    <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5.5a3 3 0 0 1 0 5.8M18 14a5 5 0 0 1 3 4.5V20" />
                  </svg>
                )}
              </div>

              <h3 className="mt-5 text-xl font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {section.description}
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#344a39] transition-all group-hover:gap-3 dark:text-green-300">
                {section.action}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-9 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Quick actions
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
          Quickly access common store management tasks.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/admin/products"
            className="rounded-lg bg-[#344a39] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#25372a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78866b]"
          >
            + Add a product
          </Link>

          <Link
            href="/admin/categories"
            className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78866b] dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            + Create a category
          </Link>
        </div>
      </section>
    </div>
  );
}

