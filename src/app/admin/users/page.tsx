
"use client";

import { useEffect, useState } from "react";

interface StoreUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

const inputClassName =
  "w-full max-w-md rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#78866b] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<StoreUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<StoreUser | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("API URL is not configured.");
        }

        const response = await fetch(`${apiUrl}/users`);

        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const data: StoreUser[] = await response.json();
        setUsers(data);
      } catch {
        setError("Unable to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-sm tracking-wide text-gray-500 dark:text-gray-400">
        LUMORA / ADMIN
      </p>

      <header className="mt-2">
        <h1 className="text-3xl font-semibold text-[#344a39] dark:text-green-300">
          Users
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          View and search registered users.
        </p>
      </header>

      <div className="mt-6">
        <label htmlFor="user-search" className="sr-only">
          Search users by name, email, or role
        </label>

        <input
          id="user-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, email, or role..."
          className={inputClassName}
          aria-label="Search users"
        />
      </div>

      {selectedUser && (
        <section
          aria-labelledby="user-details-heading"
          className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900 sm:p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <h2
              id="user-details-heading"
              className="text-xl font-semibold text-gray-900 dark:text-white"
            >
              User details
            </h2>

            <button
              type="button"
              onClick={() => setSelectedUser(null)}
              className="text-sm text-gray-600 hover:underline dark:text-gray-300"
            >
              Close
            </button>
          </div>

          <dl className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                User ID
              </dt>
              <dd className="mt-1 font-medium text-gray-900 dark:text-gray-100">
                {selectedUser.id}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Full name
              </dt>
              <dd className="mt-1 font-medium text-gray-900 dark:text-gray-100">
                {selectedUser.name}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Email
              </dt>
              <dd className="mt-1 break-words font-medium text-gray-900 dark:text-gray-100">
                {selectedUser.email}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-gray-500 dark:text-gray-400">
                Role
              </dt>
              <dd className="mt-1 font-medium text-gray-900 dark:text-gray-100">
                {selectedUser.role}
              </dd>
            </div>
          </dl>
        </section>
      )}

      <section className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            All users
          </h2>

          {!loading && !error && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredUsers.length}{" "}
              {filteredUsers.length === 1 ? "user" : "users"}
            </p>
          )}
        </div>

        {loading ? (
          <p className="mt-5 text-gray-600 dark:text-gray-300">
            Loading users...
          </p>
        ) : error ? (
          <p
            role="alert"
            className="mt-5 rounded-lg bg-red-50 p-3 text-red-700 dark:bg-red-950 dark:text-red-300"
          >
            {error}
          </p>
        ) : filteredUsers.length === 0 ? (
          <p className="mt-5 text-gray-600 dark:text-gray-300">
            No matching users found.
          </p>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <tr>
                  <th scope="col" className="p-4 font-semibold">
                    ID
                  </th>
                  <th scope="col" className="p-4 font-semibold">
                    Name
                  </th>
                  <th scope="col" className="p-4 font-semibold">
                    Email
                  </th>
                  <th scope="col" className="p-4 font-semibold">
                    Role
                  </th>
                  <th scope="col" className="p-4 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="text-gray-700 dark:text-gray-200">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 last:border-0 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    <td className="p-4">{user.id}</td>

                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </td>

                    <td className="p-4">{user.email}</td>

                    <td className="p-4">
                      <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                        {user.role}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => setSelectedUser(user)}
                        className="font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-blue-400"
                      >
                        View
                      </button>
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

