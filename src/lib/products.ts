
export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  creationAt?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCategories(): Promise<Category[]> {
  if (!API_URL) {
    throw new Error(
      "The API URL is not configured. Check your .env.local file."
    );
  }

  const response = await fetch(`${API_URL}/categories`);

  if (!response.ok) {
    throw new Error(
      `Failed to load categories. Status: ${response.status}`
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("The API returned an unexpected categories response.");
  }

  return data as Category[];
}
export async function fetchCategoryProducts(
  categoryId: number
): Promise<Product[]> {
  if (!API_URL) {
    throw new Error(
      "The API URL is not configured. Check your .env.local file."
    );
  }

  const response = await fetch(
    `${API_URL}/categories/${categoryId}/products`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load category products. Status: ${response.status}`
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error(
      "The API returned an unexpected category products response."
    );
  }

  return data as Product[];
}



export async function fetchProducts(): Promise<Product[]> {
  if (!API_URL) {
    throw new Error(
      "The API URL is not configured. Check your .env.local file."
    );
  }

  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error(
      `Failed to load products. Status: ${response.status}`
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("The API returned an unexpected products response.");
  }

  return data as Product[];
}

export async function fetchProduct(id: string): Promise<Product> {
  if (!API_URL) {
    throw new Error(
      "The API URL is not configured. Check your .env.local file."
    );
  }

  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to load product. Status: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("id" in data) ||
    !("title" in data) ||
    !("price" in data)
  ) {
    throw new Error("The API returned an invalid product.");
  }

  return data as Product;
}

export interface ProductInput {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

async function sendProductRequest(
  url: string,
  method: "POST" | "PUT" | "DELETE",
  body?: ProductInput
) {
  if (!API_URL) {
    throw new Error("The API URL is not configured.");
  }

  const response = await fetch(url, {
    method,
    headers: body
      ? { "Content-Type": "application/json" }
      : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

 if (!response.ok) {
  const details = await response.text();

  throw new Error(
    `Product request failed (${response.status}): ${details}`
  );
}

  if (method === "DELETE") {
    return;
  }

  return (await response.json()) as Product;
}

export function createProduct(input: ProductInput) {
  return sendProductRequest(
    `${API_URL}/products`,
    "POST",
    input
  );
}

export function updateProduct(
  id: number,
  input: ProductInput
) {
  return sendProductRequest(
    `${API_URL}/products/${id}`,
    "PUT",
    input
  );
}

export function deleteProduct(id: number) {
  return sendProductRequest(
    `${API_URL}/products/${id}`,
    "DELETE"
  );
}

export async function fetchCategoryBySlug(
  slug: string
): Promise<Category> {
  if (!API_URL) {
    throw new Error("The API URL is not configured.");
  }

  const response = await fetch(
    `${API_URL}/categories/slug/${encodeURIComponent(slug)}`
  );

  if (!response.ok) {
    throw new Error(`Failed to load category. Status: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("id" in data) ||
    !("name" in data)
  ) {
    throw new Error("The API returned an invalid category.");
  }

  return data as Category;
}


