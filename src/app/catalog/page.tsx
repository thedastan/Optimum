import CatalogPage from "@/components/pages/catalog/CatalogPage";
import { generateMetadata } from "@/lib/seo";
import React from "react";

export const metadata = generateMetadata({
  title: "Каталог",
  description: "Каталог автозапчастей",
  url: "https://optimum-kg.vercel.app/catalog",
  image: "/image.png",
});

const page = () => <CatalogPage />;

export default page;
