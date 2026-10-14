"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function StoreLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <>
      {!isAdminPage && <Header />}
      <main className="flex-1">{children}</main>
      {!isAdminPage && <Footer />}
    </>
  );
}
