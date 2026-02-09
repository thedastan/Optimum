"use client";
import { FC, ReactNode, useState } from "react";
import scss from "./LayoutPage.module.scss";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import MobileBottomNav from "./mobile-nav/MobileBottomNav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface LayoutPageProps {
  children: ReactNode;
}

export const LayoutPage: FC<LayoutPageProps> = ({ children }) => {
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
        <Footer />
        <MobileBottomNav />
      </QueryClientProvider>
    </div>
  );
};
