"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useVerifyResetCode } from "@/redux/hooks/auth";
import { Description } from "@/components/ui/text/Description";

import { toast } from "alert-go";
import "alert-go/dist/notifier.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface Props {
  email: string;
  resetCode: string;
  onSuccess: () => void;
}

const CreatePassword: React.FC<Props> = ({ email, resetCode, onSuccess }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { mutateAsync, isPending } = useVerifyResetCode();

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
        email,
        reset_code: resetCode,
        new_password: password,
      });

      onSuccess();
    } catch {
      toast.error("Ошибка смены пароля", { position: "top-center" });
    }
  };

  return (
    <div className="bg-white rounded-[12px] p-6 md:w-[420px] w-full">
      <TitleComponent className="text-center !text-[24px]">
        Новый пароль
      </TitleComponent>

      <form className="w-full flex flex-col items-end" onSubmit={handleSubmit}>
        {/* Password */}
        <div className="w-full mt-6">
          <Description className="font-[600]">
            Новый пароль <span className="text-red-600">*</span>
          </Description>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Введите пароль"
              className="border p-2 rounded-lg w-full mb-4 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-5 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <AiFillEye size={20} />
              ) : (
                <AiFillEyeInvisible size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm */}
        <div className="w-full">
          <Description className="font-[600]">
            Подтверждение пароля <span className="text-red-600">*</span>
          </Description>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Введите пароль"
              className="border p-2 rounded-lg w-full mb-4 outline-none"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2 top-5 -translate-y-1/2 text-gray-500"
            >
              {showConfirm ? (
                <AiFillEye size={20} />
              ) : (
                <AiFillEyeInvisible size={20} />
              )}
            </button>
          </div>
        </div>

        <Button disabled={isPending} className="md:!w-[100px] w-full">
          {isPending ? "Сохранение..." : "Сохранить"}
        </Button>
      </form>
    </div>
  );
};

export default CreatePassword;
