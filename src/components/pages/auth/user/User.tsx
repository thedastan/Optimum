"use client";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { BsCart3 } from "react-icons/bs";

import Image from "next/image";
import React, { useState } from "react";

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
];

const User = () => {
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");
  const [isSend, setIsSend] = useState(false);

  return (
    <section className="pb-[20px] md:pb-[50px]">
      <div className="w-full border-b py-4">
        <div className="container">
          <Description className="!text-[#313131]">
            Главная / Личный кабинет
          </Description>
        </div>
      </div>
      <div className="w-full border-b">
        <div className="container">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-4 font-[500] ${
                activeTab === "orders"
                  ? "border-b-[3px] border-black"
                  : "text-[#747474] border-white border-b-[3px]"
              }`}
            >
              История заказов
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 font-[500] ${
                activeTab === "profile"
                  ? "border-b-[3px] border-black"
                  : "text-[#747474] border-white border-b-[3px]"
              }`}
            >
              Личная информация
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="">
          {activeTab === "orders" && (
            <div className="">
              <div className="w-full py-4">
                <TitleComponent>История заказов</TitleComponent>
              </div>
              <div className="flex flex-col md:flex-row md:items-start items-center justify-between gap-6">
                <div className="flex w-full flex-col gap-3 mt-[22px]">
                  {data.map((el, i) => (
                    <div
                      key={i}
                      className="flex flex-col  gap-1 md:flex-row h-full w-full border-b pb-4"
                    >
                      <div className="w-[460px] flex gap-6">
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

                        <div className="flex w-full flex-col gap-[6px] flex-1">
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
                          <Description>
                            Дата заявки: 04.09.2025, 10:48
                          </Description>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 items-start w-[50%]">
                        <div className="rounded-[8px] bg-[#FFECEC] text-[#E60000] font-[600] text-[14px] flex justify-center items-center px-4 py-2">
                          Скоро менеджер свяжется с вами!
                        </div>

                        <div className="rounded-[8px] bg-[#F5F5F5] text-[14px] flex justify-center items-center px-4 py-2">
                          1000 шт
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="">
              {isSend && (
                <div className="rounded-[8px] bg-[#FFF9F5] text-[#D95700] text-[14px] px-4 py-2 mt-4">
                  На вашу почту была отправлена ссылка для подтверждения.
                  Пожалуйста подтвердите почту
                </div>
              )}

              <div className="w-full py-4">
                <TitleComponent>Личная информация</TitleComponent>
                <Description className="mt-[22px]">
                  Вы можете поменять фио, номер телефона и номер WhatsApp
                </Description>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-[22px]">
                <div>
                  <Description>ФИО</Description>
                  <input
                    type="text"
                    placeholder="ФИО"
                    className="border p-2 rounded-[8px] outline-none w-full h-[40px] mt-1"
                  />
                </div>
                <div>
                  <Description>Номер телефона</Description>
                  <input
                    type="text"
                    placeholder="Номер телефона"
                    className="border p-2 rounded-[8px] outline-none w-full h-[40px] mt-1"
                  />
                </div>
                <div>
                  <Description>Email</Description>
                  <input
                    type="text"
                    placeholder="Email"
                    className="border p-2 rounded-[8px] outline-none w-full h-[40px] mt-1"
                  />
                </div>
                <div>
                  <Description>Номер WhatsApp (необязательно)</Description>
                  <input
                    type="text"
                    placeholder="Номер WhatsApp"
                    className="border p-2 rounded-[8px] outline-none w-full h-[40px] mt-1"
                  />
                </div>
              </div>
              <div className="w-full flex justify-end mt-[22px]">
                <Button
                  onClick={() => setIsSend(true)}
                  className="md:w-[107px] w-full"
                >
                  Сохранить
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default User;
