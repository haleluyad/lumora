
"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import ThemeProvider from "@/components/ThemeProvider";

export default function Providers({
  children,
}: {
  children: ReactNode;
}) {
  return (

   <ThemeProvider>
   <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}
