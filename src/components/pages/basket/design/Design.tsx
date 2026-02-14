"use client";

import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { PRIVATE_API } from "@/api/interceptors";

import { getCart, ICartItem } from "@/components/shared/utils/cartStorage";
import { useMyData } from "@/redux/hooks/auth";
import { useSearchParams } from "next/navigation";

interface IFormTelegram {
  name: string;
  phone: string;
  whatsapp: string;
}

const Design = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<ICartItem[]>([]);

  const params = useSearchParams();
  const { data: user } = useMyData();
  const { register, handleSubmit, reset, setValue } = useForm<IFormTelegram>();

  // Получаем товар с детальной страницы через query
  const singleProduct = params.get("product")
    ? JSON.parse(params.get("product")!)
    : null;

  // Инициализация корзины
  useEffect(() => {
    if (singleProduct) {
      setCart((prev) =>
        prev[0]?.id !== singleProduct.id ? [singleProduct] : prev,
      );
    } else {
      const cartData = getCart();
      setCart((prev) => {
        if (prev.length !== cartData.length) return cartData;
        for (let i = 0; i < prev.length; i++) {
          if (prev[i].id !== cartData[i].id) return cartData;
        }
        return prev;
      });
    }
  }, [singleProduct]);

  // Автозаполнение формы если пользователь авторизован
  useEffect(() => {
    if (user) {
      setValue("name", user.first_name || "");
      setValue("phone", user.phone_number || "");
      setValue("whatsapp", user.whatsapp || "");
    }
  }, [user, setValue]);

  const totalPrice = cart.reduce(
    (acc, el) => acc + (el.discount || el.price) * el.quantity,
    0,
  );

  // Формируем сообщение для Telegram
  const messageModel = (data: IFormTelegram) => {
    let messageTG = `🧾 <b>Новый заказ</b>\n\n`;
    messageTG += `👤 Name: <b>${data.name}</b>\n`;
    messageTG += `📞 Phone: <b>${data.phone}</b>\n`;
    messageTG += `💬 WhatsApp: <b>${data.whatsapp}</b>\n\n`;
    messageTG += `<b>📦 Товары:</b>\n`;

    cart.forEach((el) => {
      messageTG += `• ${el.product_name}\n`;
      messageTG += `   ${el.quantity} × ${el.discount || el.price}c\n`;
      messageTG += `   Артикул: ${el.article}\n\n`;
    });

    messageTG += `💰 <b>Итого: ${totalPrice}c</b>`;
    return messageTG;
  };

  // Отправка заказа
  const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
    try {
      // Telegram
      await axios.post(
        `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TG_TOKEN}/sendMessage`,
        {
          chat_id: process.env.NEXT_PUBLIC_TG_CHAT_ID,
          parse_mode: "html",
          text: messageModel(data),
        },
      );

      // API заказ если авторизован
      const token = localStorage.getItem("access_token");
      if (token && user) {
        for (const item of cart) {
          await PRIVATE_API.post("/orders/", {
            product_id: item.id,
            quantity: item.quantity,
          });
        }
      }

      reset();
      setIsOpen(true);
    } catch (error) {
      console.error(error);
      alert("Ошибка оформления заказа");
    }
  };

  return (
    <section className="pb-[20px] md:pb-[50px]">
      <div className="w-full border-b py-4">
        <div className="container">
          <Description className="!text-[#313131]">
            Главная / Корзина
          </Description>
        </div>
      </div>

      <div className="container">
        <div className="w-full py-4">
          <TitleComponent>Корзина</TitleComponent>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col-reverse md:flex-row gap-6"
        >
          {/* FORM */}
          <div className="bg-white rounded-[12px] w-full p-4">
            <Description>ФИО</Description>
            <input
              {...register("name", { required: true })}
              className="border p-2 rounded-[8px] w-full mb-3"
            />

            <Description>Телефон</Description>
            <input
              {...register("phone", { required: true })}
              className="border p-2 rounded-[8px] w-full mb-3"
            />

            <Description>WhatsApp</Description>
            <input
              {...register("whatsapp")}
              className="border p-2 rounded-[8px] w-full mb-3"
            />

            <Button type="submit" className="w-full !bg-[#E60000]">
              Подтвердить заказ
            </Button>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white border rounded-[12px] w-full md:w-[550px] p-6">
            {cart.map((el, i) => (
              <div key={i} className="border-b pb-3 mb-3">
                <Description>{el.product_name}</Description>
                <Description>
                  {(el.discount || el.price) * el.quantity} c
                </Description>
                <Description>
                  {el.quantity} × {el.discount || el.price} c
                </Description>
                <Description>Артикул: {el.article}</Description>
              </div>
            ))}

            <div className="flex justify-between pt-4">
              <Title>Итого:</Title>
              <Description>{totalPrice}c</Description>
            </div>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-[16px] relative w-[90%] max-w-md">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4"
            >
              <IoMdClose />
            </button>

            <Title>Заказ оформлен!</Title>
            <Description>Менеджер скоро свяжется с вами.</Description>

            <Button className="mt-4 w-full !bg-[#E60000]">
              <Link href="/">Продолжить</Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Design;
