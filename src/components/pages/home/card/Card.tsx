"use client";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { BsCart3 } from "react-icons/bs";

import Image from "next/image";
import Button from "@/components/ui/button/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useProducts } from "@/redux/hooks/product";
import { addToCart } from "@/components/shared/utils/cartStorage";

const Card = () => {
  const { data } = useProducts();
  console.log(data, "data data");

  return (
    <section className="py-[20px] md:py-[50px]">
      <div className="container">
        <div className="">
          <div className="">
            <TitleComponent>Популярные товары</TitleComponent>
            <Description className="mt-[22px] w-[340px] md:w-full">
              Качественные капоты для автомобилей популярных брендов. Прочный
              металл, идеальная посадка, возможность окраски в цвет вашего авто.
            </Description>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-[22px]">
            {data?.map((el, i) => (
              <Link
                // href={"/detail"}
                href={`/detail/${el.slug}`}
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
                  {/* Точки под картинкой */}
                  <div
                    className={`custom-pagination-${i} flex justify-center `}
                  ></div>
                </div>

                <div className="flex flex-col gap-[6px] flex-1">
                  {" "}
                  {/* flex-1 растягивает карточку */}
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
                  <Description>АРТИКУЛ: {el.article}</Description>
                </div>

                {/* <Button className="flex items-center gap-2 mt-auto">
                   
                  <BsCart3 />В корзину
                </Button> */}

                <Button
                  onClick={(e) => {
                    e.preventDefault();
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
                  }}
                  className="flex items-center gap-2 mt-auto"
                >
                  <BsCart3 /> В корзину
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
