
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface RegisteredUser {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

async function authRequest<T>(
  endpoint: string,
  body: Record<string, string>
): Promise<T> {
  if (!API_URL) {
    throw new Error("The API URL is not configured.");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    let message = "Something went wrong. Please try again.";

    if (typeof data === "object" && data !== null && "message" in data) {
      const apiMessage = data.message;

      if (typeof apiMessage === "string") {
        message = apiMessage;
      } else if (Array.isArray(apiMessage)) {
        message = apiMessage.join(", ");
      }
    }

    throw new Error(message);
  }

  return data as T;
}

export async function checkEmailAvailability(email: string) {
  return authRequest<{ isAvailable: boolean }>(
    "/users/is-available",
    { email }
  );
}

export async function registerUser(user: RegisterData) {
  return authRequest<RegisteredUser>("/users", {
    name: user.name,
    email: user.email,
    password: user.password,
    avatar: "https://i.pravatar.cc/300",
  });
}
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export async function loginUser(
  credentials: LoginData
): Promise<LoginResponse> {
  return authRequest<LoginResponse>("/auth/login", {
    email: credentials.email,
    password: credentials.password,
  });
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export async function fetchUserProfile(
  token: string
): Promise<AuthUser> {
  if (!API_URL) {
    throw new Error("The API URL is not configured.");
  }

  const response = await fetch(`${API_URL}/auth/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error("Unable to load your profile. Please sign in again.");
  }

  return data as AuthUser;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export async function refreshAuthToken(
  refreshToken: string
): Promise<RefreshTokenResponse> {
  if (!API_URL) {
    throw new Error("The API URL is not configured.");
  }

  const response = await fetch(`${API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error("Your session has expired. Please sign in again.");
  }

  return data as RefreshTokenResponse;
}

