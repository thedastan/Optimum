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
import Link from "next/link";
import { useEditProfile, useMyData } from "@/redux/hooks/auth";
import { useOrders } from "@/redux/hooks/order";
import Personal_information from "./Personal_information";
import Orders from "./Orders";

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
        {activeTab === "orders" && <Orders />}

        {activeTab === "profile" && <Personal_information />}
      </div>
    </section>
  );
};

export default User;
