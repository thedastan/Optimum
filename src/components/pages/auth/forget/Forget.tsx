"use client";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import React, { useState } from "react";
import { Description } from "@/components/ui/text/Description";
import Button from "@/components/ui/button/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { useForgotPassword } from "@/redux/hooks/auth";
import Password_recovery from "./Password_recovery";
import Create_password from "./Create_password";

const Forget = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const { mutate, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(email, {
      onSuccess: () => {
        alert("Письмо отправлено на почту");
        setEmail("");
      },
      onError: () => {
        alert("Ошибка отправки");
      },
    });
  };

  return (
    <section className="bg-[#F5F5F5] py-10 h-[200vh]">
      <div className="flex justify-center flex-col items-center gap-4">
        <Password_recovery />

        <div className="bg-white border rounded-[12px] md:w-[425px] w-[90%] flex flex-col items-center gap-2 p-6">
          <TitleComponent className="!text-[24px] w-full text-center">
            Проверьте почту
          </TitleComponent>
          <Description>
            Мы отправили ссылку для восстановления пароля
          </Description>
          <div className="flex justify-end w-full mt-2">
            <Button type="button" className="md:!w-[200px] w-full">
              <Link href="user">Вернуться на главную</Link>
            </Button>
          </div>
        </div>

        <Create_password />

        {/* Шаг 5: Вы успешно поменяли пароль */}
        <div className="bg-white border rounded-[12px] md:w-[425px] w-[90%] flex flex-col items-center gap-2 p-6">
          <TitleComponent className="!text-[24px] w-full text-center">
            Вы успешно поменяли пароль!
          </TitleComponent>
          <div className="flex justify-end w-full mt-2">
            <Button type="button" className="md:!w-[78px] w-full">
              <Link href="user"> Войти</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forget;
