"use client";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { BsCart3 } from "react-icons/bs";

import Image from "next/image";
import React, { useEffect, useState } from "react";

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
import { useEditProfile, useMyData } from "@/redux/hooks/auth";
import { useOrders } from "@/redux/hooks/order";

const User = () => {
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");
  const [isSend, setIsSend] = useState(false);

  const { data, isPending } = useMyData();
  const { data: orders, isLoading } = useOrders();

  const { mutate, isPending: updating } = useEditProfile();

  const [form, setForm] = useState({
    first_name: "",
    email: "",
    phone_number: "",
    whatsapp: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        first_name: data.first_name || "",
        email: data.email || "",
        phone_number: data.phone_number || "",
        whatsapp: data.whatsapp || "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    mutate(form, {
      onSuccess: () => {
        setIsSend(true);
      },
    });
  };

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
        {activeTab === "orders" && (
          <div className="">
            <div className="w-full py-4">
              <TitleComponent>История заказов</TitleComponent>
            </div>

            <div className="flex flex-col md:flex-row md:items-start items-center justify-between gap-6">
              <div className="flex w-full flex-col gap-3 mt-[22px]">
                {orders?.map((order, i) =>
                  order.items.map((item, idx) => (
                    <div
                      key={`${i}-${idx}`}
                      className="flex flex-col gap-1 md:flex-row h-full w-full border-b pb-4"
                    >
                      <div className="w-[460px] flex gap-6">
                        <div className="w-[116px]">
                          <div className="flex flex-col gap-[6px]">
                            <div className="relative w-full">
                              <Swiper
                                modules={[Pagination]}
                                pagination={{
                                  clickable: true,
                                  el: `.custom-pagination-${i}-${idx}`,
                                  renderBullet: (_, className) =>
                                    `<span class="${className} custom-dot"></span>`,
                                }}
                                className="w-full"
                              >
                                {item.product.images.map((imgItem, imgIdx) => (
                                  <SwiperSlide key={imgIdx}>
                                    <div className="w-full h-[106px] overflow-hidden rounded-t-[20px]">
                                      <Image
                                        src={imgItem.image}
                                        width={100}
                                        height={106}
                                        alt={item.product.product_name}
                                        className="w-full object-cover h-full"
                                      />
                                    </div>
                                  </SwiperSlide>
                                ))}
                              </Swiper>
                            </div>
                            <div
                              className={`custom-pagination-${i}-${idx} flex justify-center`}
                            ></div>
                          </div>
                        </div>

                        <div className="flex w-full flex-col gap-[6px] flex-1">
                          <Title className="font-[100]">
                            {item.product.product_name}
                          </Title>
                          <div className="flex items-center gap-1">
                            {item.product.discount ? (
                              <>
                                <Title>
                                  {item.product.price - item.product.discount}c
                                </Title>
                                <Title className="text-[#747474] line-through">
                                  {item.product.price}c
                                </Title>
                              </>
                            ) : (
                              <Title>{item.product.price}c</Title>
                            )}
                          </div>
                          <Description>
                            {item.quantity} x {item.price}c
                          </Description>
                          <Description>
                            АРТИКУЛ: {item.product.article}
                          </Description>
                          <Description>
                            Дата заявки:{" "}
                            {new Date(order.created_at).toLocaleString()}
                          </Description>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 items-start w-[50%]">
                        {/* <div className="rounded-[8px] bg-[#FFECEC] text-[#E60000] font-[600] text-[14px] flex justify-center items-center px-4 py-2">
                          Скоро менеджер свяжется с вами!
                        </div> */}

                        {!order.consideration && (
                          <div className="rounded-[8px] bg-[#FFECEC] text-[#E60000] font-[600] text-[14px] flex justify-center items-center px-4 py-2">
                            Скоро менеджер свяжется с вами!
                          </div>
                        )}

                        <div className="rounded-[8px] bg-[#F5F5F5] text-[14px] flex justify-center items-center px-4 py-2">
                          {item.quantity} шт
                        </div>
                      </div>
                    </div>
                  )),
                )}
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
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="ФИО"
                  className="border p-2 rounded-[8px] outline-none w-full h-[40px] mt-1"
                />
              </div>
              <div>
                <Description>Номер телефона</Description>
                <input
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  placeholder="Номер телефона"
                  className="border p-2 rounded-[8px] outline-none w-full h-[40px] mt-1"
                />
              </div>
              <div>
                <Description>Email</Description>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border p-2 rounded-[8px] outline-none w-full h-[40px] mt-1"
                />
              </div>
              <div>
                <Description>Номер WhatsApp (необязательно)</Description>
                <input
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="Номер WhatsApp"
                  className="border p-2 rounded-[8px] outline-none w-full h-[40px] mt-1"
                />
              </div>
            </div>
            <div className="w-full flex justify-end mt-[22px]">
              <Button
                onClick={handleSave}
                disabled={updating}
                className="md:w-[107px] w-full"
              >
                {updating ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default User;
