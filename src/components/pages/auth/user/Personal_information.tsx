"use client";

import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useEditProfile, useMyData } from "@/redux/hooks/auth";
import React, { useEffect, useState } from "react";

import PhoneInput from "phone-go";
import "phone-go/dist/phone-go.css";

import { toast } from "alert-go";
import "alert-go/dist/notifier.css";

const Personal_information = () => {
  // const [isSend, setIsSend] = useState(false);

  const { data } = useMyData();
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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    mutate(form, {
      onSuccess: () => {
        // setIsSend(true);
        toast.success("Данные успешно изменены", {
          position: "top-center",
        });
      },
    });
  };

  return (
    <div>
      {/* {isSend && (
        <div className="rounded-[8px] bg-[#FFF9F5] text-[#D95700] text-[14px] px-4 py-2 mt-4">
          На вашу почту была отправлена ссылка для подтверждения. Пожалуйста
          подтвердите почту
        </div>
      )} */}

      <div className="w-full py-4">
        <TitleComponent>Личная информация</TitleComponent>
        <Description className="mt-[22px]">
          Вы можете поменять ФИО, номер телефона и номер WhatsApp
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
          <PhoneInput
            className="my-phone-input mt-1"
            value={form.phone_number}
            onChange={(value: string) =>
              setForm((prev) => ({
                ...prev,
                phone_number: value,
              }))
            }
            defaultCountry="KG"
            placeholder="Телефон"
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
          <PhoneInput
            className="my-phone-input mt-1"
            value={form.whatsapp}
            onChange={(value: string) =>
              setForm((prev) => ({
                ...prev,
                whatsapp: value,
              }))
            }
            defaultCountry="KG"
            placeholder="Номер WhatsApp"
          />
        </div>
      </div>

      <div className="w-full flex justify-end mt-[22px]">
        <Button
          onClick={handleSave}
          disabled={updating}
          className="md:w-[107px] w-full"
        >
          {updating ? "Сохранение" : "Сохранить"}
        </Button>
      </div>
    </div>
  );
};

export default Personal_information;
