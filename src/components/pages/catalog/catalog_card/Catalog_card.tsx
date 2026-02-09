"use client";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { BsCart3 } from "react-icons/bs";

import Image from "next/image";
import React, { useMemo } from "react";

import img2 from "@/assets/svg/card.svg";
import img from "@/assets/svg/card2.svg";
import img3 from "@/assets/images/Asim.png";
import Button from "@/components/ui/button/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { IoArrowBackOutline, IoArrowForward } from "react-icons/io5";
import { useProducts } from "@/redux/hooks/product";

interface CatalogCardProps {
  filters: {
    selectedMarka: string | null;
    selectedModel: string | null;
    selectedKuzov: string | null;
    selectedTypes: string[];
  };
}

const Catalog_card: React.FC<CatalogCardProps> = ({ filters }) => {
  const { data } = useProducts();
  console.log(data, "data data");

  // Основная логика фильтрации
  const filteredProducts = useMemo(() => {
    if (!data) return [];
    return data.filter((product) => {
      const matchMarka =
        !filters.selectedMarka ||
        product.brand.brand_name === filters.selectedMarka;
      const matchModel =
        !filters.selectedModel ||
        product.model.model_name === filters.selectedModel;
      const matchKuzov =
        !filters.selectedKuzov ||
        product.body.type_name === filters.selectedKuzov;
      const matchType =
        filters.selectedTypes.length === 0 ||
        filters.selectedTypes.includes(product.parts.spare_name);

      return matchMarka && matchModel && matchKuzov && matchType;
    });
  }, [data, filters]);

  return (
    <section className="">
      <div className="container">
        <div className="w-full">
          <TitleComponent className="py-4">Похожие товары</TitleComponent>
          <div className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-[22px]">
              {filteredProducts?.map((el, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-[14px] h-full" // добавили h-full
                >
                  <div className="flex flex-col gap-[6px] flex-1">
                    {/* flex-1 растягивает карточку */}
                    {/* Слайдер картинки */}
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
                                src={`https://alimmah05.pythonanywhere.com${item.image}`}
                                width={300}
                                height={157}
                                alt="img"
                                className="w-full object-cover h-full"
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      {el.discount && (
                        <h2 className="absolute top-0 left-0 z-10 flex justify-center text-[16px] text-white bg-[#E60000] rounded-[20px] px-3 py-2">
                          -{el.discount}%
                        </h2>
                      )}
                    </div>
                    {/* Точки под картинкой */}
                    <div
                      className={`custom-pagination-${i} flex justify-center mt-2`}
                    ></div>
                  </div>

                  <div className="flex flex-col gap-[6px] flex-1">
                    {" "}
                    {/* flex-1 растягивает карточку */}
                    <Title className="font-[100]">{el.product_name}</Title>
                    <div className="flex items-center gap-1">
                      {el.discount ? (
                        <>
                          <Title>{el.price - el.discount}c</Title>
                          <Title className="text-[#747474] line-through">
                            {el.price}c
                          </Title>
                        </>
                      ) : (
                        <Title>{el.price}c</Title>
                      )}
                    </div>
                    <Description className="!text-[12px]">
                      {" "}
                      АРТИКУЛ{el.article}
                    </Description>
                  </div>

                  <Button className="flex items-center gap-2 mt-auto">
                    <BsCart3 />В корзину
                  </Button>
                </div>
              ))}
            </div>
            {filteredProducts.length > 0 && (
              <div className="w-full flex justify-between border-t py-6 mt-4">
                <Button className="md:!w-[110px] !bg-white hover:!bg-black border !text-black hover:!text-white">
                  <IoArrowBackOutline size={18} />
                  <span className="hidden md:inline">Previous</span>
                </Button>
                <div className="flex gap-1 items-center">
                  <span className="px-4 py-2 bg-black text-white rounded-md">
                    1
                  </span>
                </div>
                <Button className="md:!w-[84px] !bg-white hover:!bg-black border !text-black hover:!text-white">
                  <span className="hidden md:inline">Next</span>
                  <IoArrowForward size={18} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog_card;
