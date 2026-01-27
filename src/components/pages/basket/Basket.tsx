"use client";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { BsCart3 } from "react-icons/bs";

import Image from "next/image";
import React from "react";

import img2 from "@/assets/svg/card.svg";
import img from "@/assets/svg/card2.svg";
import img3 from "@/assets/images/Asim.png";
import Button from "@/components/ui/button/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";

const data = [
  {
    title: "Капот для Toyota CH-R (2016-2019)",
    price: 53500,
    article: "X0390000047",
    images: [
      {
        img: img,
      },
      {
        img: img2,
      },
      {
        img: img3,
      },
    ],
  },
  {
    title: "Капот для Toyota CH-R (2016-2019)",
    price: 53500,
    article: "X0390000047",
    images: [
      {
        img: img2,
      },
      {
        img: img,
      },
      {
        img: img3,
      },
    ],
  },
  {
    title: "Капот для Toyota CH-R (2016-2019)",
    price: 53500,
    article: "X0390000047",
    discount: 30,
    images: [
      {
        img: img,
      },
      {
        img: img2,
      },
      {
        img: img3,
      },
    ],
  },
  {
    title: "Капот для Toyota CH-R (2016-2019)",
    price: 53500,
    article: "X0390000047",
    images: [
      {
        img: img,
      },
      {
        img: img2,
      },
      {
        img: img3,
      },
    ],
  },
  {
    title: "Капот для Toyota CH-R (2016-2019)",
    price: 53500,
    article: "X0390000047",
    images: [
      {
        img: img,
      },
      {
        img: img2,
      },
      {
        img: img3,
      },
    ],
  },
  {
    title: "Капот для Toyota CH-R (2016-2019)",
    price: 53500,
    article: "X0390000047",
    images: [
      {
        img: img,
      },
      {
        img: img2,
      },
      {
        img: img3,
      },
    ],
  },
  {
    title: "Капот для Toyota CH-R (2016-2019)",
    price: 53500,
    article: "X0390000047",
    images: [
      {
        img: img,
      },
      {
        img: img2,
      },
      {
        img: img3,
      },
    ],
  },
  {
    title: "Капот для Toyota CH-R (2016-2019)",
    price: 53500,
    article: "X0390000047",
    images: [
      {
        img: img2,
      },
      {
        img: img,
      },
      {
        img: img3,
      },
    ],
  },
  {
    title: "Капот для Toyota CH-R (2016-2019)",
    price: 53500,
    article: "X0390000047",
    discount: 30,
    images: [
      {
        img: img,
      },
      {
        img: img,
      },
      {
        img: img3,
      },
    ],
  },
  {
    title: "Капот для Toyota CH-R (2016-2019)",
    price: 53500,
    article: "X0390000047",
    images: [
      {
        img: img,
      },
      {
        img: img2,
      },
      {
        img: img3,
      },
    ],
  },
  {
    title: "Капот для Toyota CH-R (2016-2019)",
    price: 53500,
    article: "X0390000047",
    images: [
      {
        img: img,
      },
      {
        img: img2,
      },
      {
        img: img3,
      },
    ],
  },
  {
    title: "Капот для Toyota CH-R (2016-2019)",
    price: 53500,
    article: "X0390000047",
    images: [
      {
        img: img,
      },
      {
        img: img2,
      },
      {
        img: img3,
      },
    ],
  },
];

const Basket = () => {
  return (
    <section className="pb-[20px] md:pb-[50px]">
      <div className="container">
        <div className="">
          <div className="w-full py-4">
            <TitleComponent>Корзина</TitleComponent>
          </div>
          <div className="flex flex-col md:flex-row md:items-start items-center justify-between gap-6">
            <div className="flex w-full flex-col gap-3 mt-[22px]">
              {data.map((el, i) => (
                <div
                  key={i}
                  className="flex flex-col  gap-6 md:flex-row h-full w-full border-b pb-4"
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
                                    src={item.img}
                                    alt={el.title}
                                    className="w-full object-cover h-full"
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                        {/* Точки под картинкой */}
                        <div
                          className={`custom-pagination-${i} flex justify-center `}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-[6px] flex-1">
                      {" "}
                      {/* flex-1 растягивает карточку */}
                      <Title className="font-[100]">{el.title}</Title>
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
                      <Description>1000 х 50000 C</Description>
                      <Description>АРТИКУЛ: {el.article}</Description>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start w-full md:w-fit">
                    <div className="flex items-center justify-center gap-2 bg-black text-white md:w-[194px] w-full h-[40px] text-[14px] rounded-[8px]">
                      <button className="h-full w-[20px] text-[20px]">-</button>
                      100
                      <button className="h-full w-[20px] text-[20px]">+</button>
                    </div>
                    <Button className="!w-[40px] !bg-white border !text-[20px] !text-black flex items-center gap-2 hover:!bg-[#E60000] hover:!text-white transition-all duration-200">
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
                  4000
                </Description>
              </div>
              <div className="w-full flex justify-between border-b">
                <TitleComponent className="!text-[20px] font-[100] w-full   pb-4">
                  Общая сумма заказа
                </TitleComponent>
                <Description className="font-[500] !text-[20px]">
                  5000000c
                </Description>
              </div>

              <div className="flex justify-end w-full mt-2">
                <Button className="w-full !bg-[#E60000]">
                  <Link href="/basket/design">Оформить заказ</Link>
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
