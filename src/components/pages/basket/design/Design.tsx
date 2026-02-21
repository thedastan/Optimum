"use client";

import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { IoMdClose } from "react-icons/io";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { PRIVATE_API } from "@/api/interceptors";

import { getCart, ICartItem } from "@/components/shared/utils/cartStorage";
import { useMyData } from "@/redux/hooks/auth";
import { useSearchParams } from "next/navigation";

import PhoneInput from "phone-go";
import "phone-go/dist/phone-go.css";

interface IFormTelegram {
  name: string;
  phone: string;
  whatsapp: string;
}

const Design = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useSearchParams();
  const { data: user } = useMyData();

  /**
   * Мемоизированный singleProduct
   * Теперь не создаётся новый объект на каждый рендер
   */
  const singleProduct = useMemo(() => {
    const productParam = params.get("product");
    return productParam ? JSON.parse(productParam) : null;
  }, [params]);

  /**
   * Инициализация корзины сразу
   * Без useEffect → без зацикливания
   */
  const [cart, setCart] = useState<ICartItem[]>(() =>
    singleProduct ? [singleProduct] : getCart(),
  );

  /**
   * Если меняется query — обновляем корзину
   */
  useEffect(() => {
    if (singleProduct) {
      setCart([singleProduct]);
    } else {
      setCart(getCart());
    }
  }, [singleProduct]);

  /**
   * React Hook Form
   */
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<IFormTelegram>();

  /**
   * Автозаполнение если пользователь авторизован
   */
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

  /**
   * Формирование сообщения
   */
  const messageModel = (data: IFormTelegram) => {
    let messageTG = `🧾 <b>Новый заказ</b>\n\n`;
    messageTG += `👤 Name: <b>${data.name}</b>\n`;
    messageTG += `📞 Phone: <b>${data.phone}</b>\n`;

    if (data.whatsapp) {
      messageTG += `💬 WhatsApp: <b>${data.whatsapp}</b>\n`;
    }

    messageTG += `\n<b>Товары:</b>\n`;

    cart.forEach((el) => {
      messageTG += `• ${el.product_name}\n`;
      messageTG += `   ${el.quantity} × ${el.discount || el.price}c\n`;
      messageTG += `   Артикул: ${el.article}\n\n`;
    });

    messageTG += `<b>Итого: ${totalPrice}c</b>`;
    return messageTG;
  };

  /**
   * Отправка
   */
  const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
    try {
      await axios.post(
        `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TG_TOKEN}/sendMessage`,
        {
          chat_id: process.env.NEXT_PUBLIC_TG_CHAT_ID,
          parse_mode: "html",
          text: messageModel(data),
        },
      );

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
      <div className="container py-4">
        <TitleComponent>Корзина</TitleComponent>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col-reverse md:flex-row gap-6 mt-6"
        >
          {/* FORM */}
          <div className="bg-white rounded-[12px] w-full p-4">
            <Description>ФИО</Description>
            <input
              {...register("name", { required: "Заполните поле" })}
              className={`border p-2 rounded-[8px] w-full mb-1 outline-none ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Введите ФИО"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>
            )}

            <Description className="mt-3">Номер телефона</Description>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Заполните поле" }}
              render={({ field }) => (
                <>
                  <PhoneInput
                    {...field}
                    defaultCountry="KG"
                    placeholder="000-000-000"
                    className="my-phone-input mt-1"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 mb-2">
                      {errors.phone.message}
                    </p>
                  )}
                </>
              )}
            />

            <Description className="mt-3">
              Номер WhatsApp (необязательно)
            </Description>
            <Controller
              name="whatsapp"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  value={field.value || ""}
                  defaultCountry="KG"
                  placeholder="000-000-000"
                  className="my-phone-input mt-1 mb-3"
                />
              )}
            />

            <div className="border p-2 rounded-[8px] w-full mb-3 bg-[#E8E8E8]">
              <Description className="flex gap-1 flex-col md:flex-row">
                Подтверждая заказ вы принимаете
                <div className="flex gap-2">
                  <Link
                    className="text-[#3188DE] border-b border-[#3188DE] h-5"
                    href="/privacy-and-rights/privacy-policy"
                  >
                    Правила
                  </Link>
                  и
                  <Link
                    className="text-[#3188DE] border-b border-[#3188DE] h-5"
                    href="/privacy-and-rights/privacy-policy"
                  >
                    Условия сайта
                  </Link>
                </div>
              </Description>
            </div>

            <Button type="submit" className="w-full !bg-[#E60000] mt-4">
              Подтвердить заказ
            </Button>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white border rounded-[12px] w-full h-full md:w-[480px] p-6">
            {cart.map((el, i) => (
              <div key={i} className="border-b pb-3 mb-3">
                <Description>{el.product_name}</Description>
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

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-[16px] md:w-[380px] w-[90%]">
            <div className="flex justify-between items-center">
              <Title className="!text-[18px]">Вы успешно оформили заказ!</Title>
              <button onClick={() => setIsOpen(false)}>
                <IoMdClose />
              </button>
            </div>

            <Description className="mt-4">
              В скором времени менеджер свяжется с вами.
            </Description>

            <Button className="mt-4 w-full">
              <Link
                href="/"
                className="w-full h-full flex items-center justify-center"
              >
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
