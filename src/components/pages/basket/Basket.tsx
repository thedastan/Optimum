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
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
  getCart,
  removeFromCart,
  updateQuantity,
  ICartItem,
} from "@/components/shared/utils/cartStorage";

const Basket = () => {
  const [cart, setCart] = useState<ICartItem[] | null>(null);

  useEffect(() => {
    // имитация загрузки
    setTimeout(() => {
      setCart(getCart());
    }, 500); // можно заменить на настоящий fetch
  }, []);

  const refresh = () => setCart(getCart());

  const totalPrice =
    cart?.reduce(
      (acc, el) => acc + (el.discount || el.price) * el.quantity,
      0,
    ) || 0;

  const totalCount = cart?.reduce((acc, el) => acc + el.quantity, 0) || 0;

  // Skeleton пока cart null
  if (cart === null) {
    return (
      <section className="pb-[20px] md:pb-[50px] animate-pulse">
        <div className="container">
          <div className="w-full py-4">
            <div className="h-8 w-1/3 bg-gray-200 rounded mb-6" />
          </div>

          <div className="flex flex-col md:flex-row md:items-start items-center justify-between gap-6">
            <div className="flex w-full flex-col gap-3 mt-[22px]">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-6 md:flex-row h-full w-full border-b pb-4"
                >
                  <div className="w-full flex gap-6">
                    <div className="w-[116px]">
                      <div className="h-[106px] bg-gray-200 rounded" />
                      <div className="flex justify-center mt-2 gap-1">
                        {Array.from({ length: 3 }).map((_, j) => (
                          <div
                            key={j}
                            className="h-2 w-2 bg-gray-300 rounded-full"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-[6px] flex-1">
                      <div className="h-4 w-3/4 bg-gray-200 rounded" />
                      <div className="h-4 w-1/2 bg-gray-200 rounded" />
                      <div className="h-4 w-1/3 bg-gray-200 rounded" />
                      <div className="h-4 w-1/4 bg-gray-200 rounded" />
                    </div>
                  </div>

                  <div className="flex gap-4 items-start w-full md:w-fit">
                    <div className="h-[40px] w-[194px] bg-gray-200 rounded-[8px]" />
                    <div className="h-[40px] w-[40px] bg-gray-200 rounded-[8px]" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border rounded-[12px] md:w-[550px] w-[100%] flex flex-col items-center gap-4 p-6">
              <div className="w-full flex justify-between border-b">
                <div className="h-6 w-1/2 bg-gray-200 rounded" />
                <div className="h-6 w-10 bg-gray-200 rounded" />
              </div>

              <div className="w-full flex justify-between border-b">
                <div className="h-6 w-1/2 bg-gray-200 rounded" />
                <div className="h-6 w-10 bg-gray-200 rounded" />
              </div>

              <div className="flex justify-end w-full mt-2">
                <div className="h-10 w-full bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Если данные есть, рендерим обычную корзину
  return (
    <section className="pb-[20px] md:pb-[50px]">
      <div className="container">
        <div className="">
          <div className="w-full py-4">
            <TitleComponent>Корзина</TitleComponent>
          </div>
          <div className="flex flex-col md:flex-row md:items-start items-center justify-between gap-6">
            <div className="flex w-full flex-col gap-3 mt-[22px]">
              {cart.map((el, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-6 md:flex-row h-full w-full border-b pb-4"
                >
                  <div className="w-full flex gap-6">
                    <div className="w-[116px]">
                      <div className="flex flex-col gap-[6px]">
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
                                <div className="w-full h-[106px] overflow-hidden rounded-t-[20px]">
                                  <Image
                                    src={item.image}
                                    alt={el.product_name}
                                    width={100}
                                    height={100}
                                    className="w-full object-cover h-full"
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>

                        <div
                          className={`custom-pagination-${i} flex justify-center`}
                        ></div>
                      </div>
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

                      <Description>
                        {el.quantity} × {el.discount || el.price} C
                      </Description>

                      <Description>АРТИКУЛ: {el.article}</Description>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start w-full md:w-fit">
                    <div className="flex items-center justify-center gap-2 bg-black text-white md:w-[194px] w-full h-[40px] text-[14px] rounded-[8px]">
                      <button
                        className="h-full w-[20px] text-[20px]"
                        onClick={() => {
                          if (el.quantity > 1) {
                            updateQuantity(el.id, el.quantity - 1);
                            refresh();
                          }
                        }}
                      >
                        -
                      </button>

                      {el.quantity}

                      <button
                        className="h-full w-[20px] text-[20px]"
                        onClick={() => {
                          updateQuantity(el.id, el.quantity + 1);
                          refresh();
                        }}
                      >
                        +
                      </button>
                    </div>

                    <Button
                      onClick={() => {
                        removeFromCart(el.id);
                        refresh();
                      }}
                      className="!w-[40px] !bg-white border !text-[20px] !text-black flex items-center gap-2 hover:!bg-[#E60000] hover:!text-white transition-all duration-200"
                    >
                      <RiDeleteBin6Line />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border rounded-[12px] md:w-[550px] w-[100%] flex flex-col items-center gap-4 p-6">
              <div className="w-full flex justify-between border-b">
                <TitleComponent className="!text-[20px] font-[100] w-full pb-4">
                  Общее количество запчастей
                </TitleComponent>
                <Description className="font-[500] !text-[20px]">
                  {totalCount}
                </Description>
              </div>

              <div className="w-full flex justify-between border-b">
                <TitleComponent className="!text-[20px] font-[100] w-full pb-4">
                  Общая сумма заказа
                </TitleComponent>
                <Description className="font-[500] !text-[20px]">
                  {totalPrice}c
                </Description>
              </div>

              <div className="flex justify-end w-full mt-2">
                <Button className="w-full !bg-[#E60000]">
                  <Link
                    className="w-full h-full flex justify-center items-center"
                    href="/basket/design"
                  >
                    Оформить заказ
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Basket;
