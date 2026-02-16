"use client";

import { FC, ReactNode, useState } from "react";
import scss from "./LayoutPage.module.scss";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import MobileBottomNav from "./mobile-nav/MobileBottomNav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

interface LayoutPageProps {
  children: ReactNode;
}

export const LayoutPage: FC<LayoutPageProps> = ({ children }) => {
  const pathname = usePathname();

  const hideFooter =
    pathname.startsWith("/auth/forget") ||
    pathname.startsWith("/auth/register");

  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    }),
  );

  return (
    <div className={scss.LayoutPage}>
      <QueryClientProvider client={client}>
        <Header />
        <main>{children}</main>

        {!hideFooter && <Footer />}
        {!hideFooter && <MobileBottomNav />}
      </QueryClientProvider>
    </div>
  );
};
