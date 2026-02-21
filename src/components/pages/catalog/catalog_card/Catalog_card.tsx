"use client";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { BsCart3 } from "react-icons/bs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/button/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useProducts } from "@/redux/hooks/product";
import Link from "next/link";
import { addToCart, getCart } from "@/components/shared/utils/cartStorage";
import { useRouter } from "next/navigation";
import { PHONE_NUMBER_LINK } from "@/constants/admin";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { IoArrowBackSharp, IoArrowForwardOutline } from "react-icons/io5";

interface Props {
  filters: {
    selectedMarka: string | null;
    selectedModel: string | null;
    selectedKuzov: string | null;
    selectedTypes: string[];
  };
}

const Catalog_card: React.FC<Props> = ({ filters }) => {
  const { data, isLoading } = useProducts();
  const [cart, setCart] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // показываем 6 товаров на страницу
  const router = useRouter();

  useEffect(() => {
    setCart(getCart());
  }, []);

  // Skeleton пока грузится
  if (isLoading) {
    return (
      <section>
        <div className="container">
          <TitleComponent className="py-4">Все товары</TitleComponent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-[22px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col gap-[14px]">
                <div className="w-full h-[157px] bg-gray-200 rounded-[20px]" />
                <div className="h-[14px] bg-gray-200 rounded w-3/4" />
                <div className="h-[14px] bg-gray-200 rounded w-1/2" />
                <div className="h-[14px] bg-gray-200 rounded w-2/3" />
                <div className="h-[40px] bg-gray-200 rounded-[8px]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  // ФИЛЬТРАЦИЯ
  const filteredProducts = data.filter((el) => {
    if (filters.selectedMarka && el.brand.brand_name !== filters.selectedMarka)
      return false;
    if (filters.selectedModel && el.model.model_name !== filters.selectedModel)
      return false;
    if (filters.selectedKuzov && el.body.type_name !== filters.selectedKuzov)
      return false;
    if (
      filters.selectedTypes.length > 0 &&
      !filters.selectedTypes.includes(el.parts.spare_name)
    )
      return false;
    return true;
  });

  // Сортировка
  const sortedProducts = [...filteredProducts].sort((a, b) =>
    a.product_name.localeCompare(b.product_name),
  );

  // Если нет товаров
  if (sortedProducts.length === 0) {
    return (
      <div className="w-full flex flex-col items-center gap-6 py-10">
        <TitleComponent>Нету запчасти</TitleComponent>
        <div className="w-[420px] p-4 border rounded-[12px] flex flex-col items-center gap-[24px]">
          <Title className="!text-[24px]">Не нашли нужный товар?</Title>
          <Description className="!text-[14px]">
            Свяжитесь с нами для заказа
          </Description>
          <Link target="_blank" href={PHONE_NUMBER_LINK} className="!w-[110px]">
            <Button className="!w-[110px]">Связаться</Button>
          </Link>
        </div>
      </div>
    );
  }

  // ПАГИНАЦИЯ
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <section>
      <div className="container">
        <TitleComponent className="py-4">Все товары</TitleComponent>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-[22px]">
          {paginatedProducts.map((el, i) => {
            const isInCart = cart.some((item) => item.id === el.id);
            return (
              <Link
                href={`/detail/${el.slug}`}
                key={el.id}
                className="flex flex-col gap-[14px] h-full"
              >
                <div className="flex flex-col gap-[6px] flex-1">
                  <div className="relative w-full">
                    <Swiper
                      modules={[Pagination]}
                      pagination={{
                        clickable: true,
                        el: `.custom-pagination-${i}`,
                        renderBullet: (_, className) =>
                          `<span class="${className} custom-dot"></span>`,
                      }}
                      className="w-full"
                    >
                      {el.images.map((item, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="w-full h-[157px] overflow-hidden rounded-t-[20px]">
                            <Image
                              src={item.image}
                              alt="img"
                              width={300}
                              height={200}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {el.discount && (
                      <h2 className="absolute top-0 left-0 z-10 flex justify-center text-[16px] text-white bg-[#E60000] rounded-[20px] px-3 py-2">
                        -
                        {Math.round(
                          ((el.price - el.discount) / el.price) * 100,
                        )}
                        %
                      </h2>
                    )}
                  </div>

                  <div
                    className={`custom-pagination-${i} flex justify-center`}
                  />
                </div>

                <div className="flex flex-col gap-[6px] flex-1">
                  <Title className="font-[100]">{el.product_name}</Title>

                  <div className="flex items-center gap-1">
                    {el.discount ? (
                      <>
                        <Title>{el.discount}c</Title>
                        <Title className="text-[#747474] line-through">
                          {el.price}c
                        </Title>
                      </>
                    ) : (
                      <Title>{el.price}c</Title>
                    )}
                  </div>

                  <Description className="!text-[12px]">
                    АРТИКУЛ: {el.article}
                  </Description>
                </div>

                <Button
                  onClick={(e) => {
                    e.preventDefault();

                    if (isInCart) {
                      router.push("/basket");
                      return;
                    }

                    addToCart({
                      id: el.id,
                      product_name: el.product_name,
                      price: el.price,
                      discount: el.discount,
                      slug: el.slug,
                      article: el.article,
                      images: el.images,
                      quantity: 1,
                    });

                    setCart(getCart());
                    window.dispatchEvent(new Event("cart-updated"));
                  }}
                  className={`flex items-center gap-2 mt-auto ${
                    isInCart ? "" : ""
                  }`}
                >
                  {isInCart ? "Перейти в" : "В корзину"}
                  <BsCart3 />
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Навигация по страницам */}
        {/* Навигация по страницам */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center gap-2 mt-6">
            <Button
              className="w-[100px] bg-white !text-black flex items-center gap-2 border hover:bg-black hover:!text-white"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <IoArrowBackSharp /> Previous
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-[#FAFAFA] text-black"
                      : "bg-white text-[#000]"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <Button
              className="w-[100px] bg-white !text-black flex items-center gap-2 border hover:bg-black hover:!text-white"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next <IoArrowForwardOutline />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog_card;
