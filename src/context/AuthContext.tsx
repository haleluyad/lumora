
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { 
    fetchUserProfile, 
    loginUser, 
    refreshAuthToken,
    type AuthUser,
 } from "@/lib/auth";


interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
    async function restoreSession() {
  const savedToken = localStorage.getItem("lumora-token");
  const savedRefreshToken = localStorage.getItem("lumora-refresh-token");

  if (!savedToken) {
    setIsLoading(false);
    return;
  }

  setToken(savedToken);

  try {
    const profile = await fetchUserProfile(savedToken);
    setUser(profile);
  } catch {
    if (!savedRefreshToken) {
      localStorage.removeItem("lumora-token");
      setToken(null);
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const refreshed = await refreshAuthToken(savedRefreshToken);

      localStorage.setItem("lumora-token", refreshed.access_token);
      localStorage.setItem("lumora-refresh-token", refreshed.refresh_token);
      setToken(refreshed.access_token);

      const profile = await fetchUserProfile(refreshed.access_token);
      setUser(profile);
    } catch {
      localStorage.removeItem("lumora-token");
      localStorage.removeItem("lumora-refresh-token");
      setToken(null);
      setUser(null);
    }
  } finally {
    setIsLoading(false);
  }
}

    restoreSession();
  }, []);

  async function login(email: string, password: string) {
    const data = await loginUser({ email, password });

    localStorage.setItem("lumora-token", data.access_token);
    localStorage.setItem("lumora-refresh-token", data.refresh_token);

    setToken(data.access_token);
     const profile = await fetchUserProfile(data.access_token);
    setUser(profile);
  }

  function logout() {
    localStorage.removeItem("lumora-token");
    localStorage.removeItem("lumora-refresh-token");

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider.");
  }

  return context;
}
