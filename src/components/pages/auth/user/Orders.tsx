"use client";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { BsCart3 } from "react-icons/bs";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useMyData } from "@/redux/hooks/auth";
import { useOrders } from "@/redux/hooks/order";

const Orders = () => {
  const { data, isPending } = useMyData();
  const { data: orders, isLoading } = useOrders();

  // Состояния формы (не обязательно для скелета)
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

  // Если данные ещё не пришли — показываем скелет
  if (isPending || isLoading) {
    return (
      <div className="w-full py-4 space-y-4">
        <div className="w-1/3 h-6 bg-gray-200 rounded animate-pulse"></div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row gap-4 border-b pb-4 animate-pulse"
          >
            <div className="w-[460px] flex gap-6">
              <div className="w-[116px] h-[106px] bg-gray-200 rounded"></div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="h-6 bg-gray-200 rounded w-full"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Основной рендер заказов
  return (
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
                    <Description>АРТИКУЛ: {item.product.article}</Description>
                    <Description>
                      Дата заявки: {new Date(order.created_at).toLocaleString()}
                    </Description>
                  </div>
                </div>

                <div className="flex flex-col gap-4 items-start w-[50%]">
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
  );
};

export default Orders;
