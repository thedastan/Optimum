"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useResetPassword } from "@/redux/hooks/auth";
import { Description } from "@/components/ui/text/Description";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface Props {
  token: string;
  onSuccess: () => void;
}

const CreatePasswordForm = ({ token, onSuccess }: Props) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { mutateAsync, isPending } = useResetPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirm) {
      toast.error("Введите пароль", { position: "top-center" });
      return;
    }

    if (password !== confirm) {
      toast.error("Пароли не совпадают", { position: "top-center" });
      return;
    }

    try {
      await mutateAsync({
        new_password: password,
        token,
      });

      toast.success("Пароль успешно изменён", {
        position: "top-center",
      });

      onSuccess();
    } catch {
      toast.error("Ошибка смены пароля", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="bg-white rounded-[12px] p-6 md:w-[420px] w-full">
      <TitleComponent className="text-center !text-[24px]">
        Новый пароль
      </TitleComponent>

      <form className="w-full flex flex-col items-end" onSubmit={handleSubmit}>
        <div className="w-full mt-6">
          <Description className="font-[600]">Новый пароль *</Description>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="border p-2 rounded-lg w-full mb-4 outline-none"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-5 -translate-y-1/2"
            >
              {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
        </div>

        <div className="w-full">
          <Description className="font-[600]">
            Подтверждение пароля *
          </Description>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              className="border p-2 rounded-lg w-full mb-4 outline-none"
              placeholder="Введите пароль"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2 top-5 -translate-y-1/2"
            >
              {showConfirm ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
        </div>

        <Button disabled={isPending} className="w-full md:!w-[120px]">
          {isPending ? "Сохранение..." : "Сохранить"}
        </Button>
      </form>
    </div>
  );
};

export default CreatePasswordForm;
