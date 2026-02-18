import DetailPage from "@/components/pages/detail/DetailPage";
import React from "react";
import { Metadata } from "next";
import { IProduct } from "@/redux/models/order.model";
import { generateMetadata as generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Распаковываем params из Promise
  const { slug } = await params;

  const res = await fetch(
    `https://alimmah05.pythonanywhere.com/api/products/product/${slug}`,
    {
      next: { revalidate: 60 },
    },
  );
  const data: IProduct = await res.json();

  return generateSeoMetadata({
    title: data.product_name ?? "Optimum",
    description:
      data.description ??
      "Кузовные запчасти для ведущих автомобильных марок: Toyota, Hyundai, Geely, Chery, KIA, Chevrolet и других. Надежное качество и широкий выбор для вашего авто!",
    url: `https://www.technohub.kg/detail/${slug}`,
    image: data.images?.[0]?.image ?? "/image.png",
    keywords:
      data.keywords ??
      "Кузовные запчасти для ведущих автомобильных марок: Toyota, Hyundai, Geely, Chery, KIA, Chevrolet и других. Надежное качество и широкий выбор для вашего авто!",
  });
}

const page = () => <DetailPage />;

export default page;
