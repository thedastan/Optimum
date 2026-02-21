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
import { addToCart, getCart } from "@/components/shared/utils/cartStorage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Card = () => {
  const { data, isLoading } = useProducts();
  const [cart, setCart] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCart(getCart());
  }, []);

  return (
    <section className="py-[20px] md:py-[50px]">
      <div className="container">
        <TitleComponent>Популярные товары</TitleComponent>

        <Description className="mt-[22px] w-[340px] md:w-full">
          Качественные капоты для автомобилей популярных брендов. Прочный
          металл, идеальная посадка, возможность окраски в цвет вашего авто.
        </Description>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-[22px]">
          {/* ===== SKELETON ===== */}
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col gap-[14px]">
                <div className="w-full h-[157px] bg-gray-200 rounded-[20px]" />

                <div className="h-[14px] bg-gray-200 rounded w-3/4" />
                <div className="h-[14px] bg-gray-200 rounded w-1/2" />
                <div className="h-[14px] bg-gray-200 rounded w-2/3" />

                <div className="h-[40px] bg-gray-200 rounded-[8px]" />
              </div>
            ))}

          {/* ===== PRODUCTS ===== */}
          {!isLoading &&
            data?.map((el, i) => {
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
                    ></div>
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

                    <Description>АРТИКУЛ: {el.article}</Description>
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
      </div>
    </section>
  );
};

export default Card;
