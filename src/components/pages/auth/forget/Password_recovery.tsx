"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useForgotPassword } from "@/redux/hooks/auth";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";

interface Props {
  onSuccess: (email: string) => void;
}

const PasswordRecovery: React.FC<Props> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  // const { mutate, isPending } = useForgotPassword();

  const { mutateAsync, isPending } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await mutateAsync(email);

      toast.success("Письмо отправлено", {
        position: "top-center",
      });

      onSuccess(email);
    } catch {
      toast.error("Ошибка отправки", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="bg-white rounded-[12px] p-6 md:w-[420px] w-full">
      <TitleComponent className="text-center !text-[24px]">
        Восстановление пароля
      </TitleComponent>

      <Description className="text-center mt-3">
        Введите почту для восстановления пароля
      </Description>

      <form className="w-full flex flex-col items-end" onSubmit={handleSubmit}>
        <div className="w-full mt-6">
          <Description className="font-[600]">
            Email <span className="text-red-600">*</span>
          </Description>
          <input
            type="email"
            className="border p-2 rounded-lg w-full mb-4 outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button
          className="md:!w-[100px] w-full"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Отправка..." : "Отправить"}
        </Button>
      </form>
    </div>
  );
};

export default PasswordRecovery;
