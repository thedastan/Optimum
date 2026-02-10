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

import { getCart, ICartItem } from "@/components/shared/utils/cartStorage";

interface IFormTelegram {
  name: string;
  phone: string;
  whatsapp: string;
}

const Design = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<ICartItem[]>([]);

  const { register, handleSubmit, reset } = useForm<IFormTelegram>();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const totalPrice = cart.reduce(
    (acc, el) => acc + (el.discount || el.price) * el.quantity,
    0,
  );

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

  const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
    await axios.post(
      `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TG_TOKEN}/sendMessage`,
      {
        chat_id: process.env.NEXT_PUBLIC_TG_CHAT_ID,
        parse_mode: "html",
        text: messageModel(data),
      },
    );

    reset();
    setIsOpen(true);
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
        <div className="">
          <div className="w-full py-4">
            <TitleComponent>Корзина</TitleComponent>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col-reverse md:flex-row md:items-start items-center justify-between gap-6"
          >
            {/* FORM */}
            <div className="bg-white rounded-[12px] w-full flex flex-col items-center gap-2">
              <div className="w-full flex flex-col gap-4 mt-2">
                <div>
                  <Description>ФИО</Description>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="ФИО"
                    className="border p-2 rounded-[8px] outline-none w-full h-[40px] mt-1"
                  />
                </div>

                <div>
                  <Description>Номер телефона</Description>
                  <input
                    {...register("phone", { required: true })}
                    type="text"
                    placeholder="Номер телефона"
                    className="border p-2 rounded-[8px] outline-none w-full h-[40px] mt-1"
                  />
                </div>

                <div>
                  <Description>Номер WhatsApp (необязательно)</Description>
                  <input
                    {...register("whatsapp")}
                    type="text"
                    placeholder="Номер WhatsApp"
                    className="border p-2 rounded-[8px] outline-none w-full h-[40px] mt-1"
                  />
                </div>

                <div>
                  <div className="border-[#ebebeb] border p-2 rounded-[8px] bg-[#E8E8E8] w-full md:h-[40px] h-auto mt-1">
                    <Description className="flex flex-col md:flex-row gap-1 w-full">
                      Подтверждая заказ вы принимаете
                      <div className="flex gap-1">
                        <span className="text-[#3188DE]">
                          <Link href="">Правила</Link>
                        </span>
                        и
                        <span className="text-[#3188DE]">
                          <Link href="">Условия сайта</Link>
                        </span>
                      </div>
                    </Description>
                  </div>
                </div>
              </div>

              <div className="flex justify-end w-full mt-2">
                <Button type="submit" className="w-full !bg-[#E60000]">
                  Подтвердить заказ
                </Button>
              </div>
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white border rounded-[12px] md:w-[550px] w-[100%] flex flex-col gap-4 p-6">
              {cart.map((el, i) => (
                <div
                  key={i}
                  className="w-full flex flex-col gap-1 border-b pb-3"
                >
                  <Description className="font-[100] w-full">
                    {el.product_name}
                  </Description>
                  <Description className="font-[600]">
                    {(el.discount || el.price) * el.quantity} c
                  </Description>
                  <Description className="font-[100] !text-[12px] w-full">
                    {el.quantity} × {el.discount || el.price} C
                  </Description>
                  <Description className="font-[100] !text-[12px] w-full">
                    АРТИКУЛ: {el.article}
                  </Description>
                </div>
              ))}

              <div className="w-full flex items-center justify-between py-6">
                <Title className="!text-[20px] font-[100]">Итого:</Title>
                <Description className="font-[500] !text-[20px]">
                  {totalPrice}c
                </Description>
              </div>
            </div>
          </form>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[16px] p-6 md:w-[384px] w-[90%] max-w-md relative flex flex-col gap-2">
            <div className="flex w-full justify-between items-center">
              <Title className="!text-[20px]">Вы успешно оформили заказ!</Title>
              <button onClick={() => setIsOpen(false)}>
                <IoMdClose />
              </button>
            </div>
            <Description className="w-[250px]">
              В скором времени менеджер свяжется с Вами!
            </Description>
            <Button className="text-white mt-4">
              <Link className="w-full" href="/">
                Продолжить
              </Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Design;
