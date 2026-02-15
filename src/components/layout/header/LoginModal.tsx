"use client";

import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useLogin } from "@/redux/hooks/auth";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import Link from "next/link";

// Импорт alert-go
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";

interface Props {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  setIsAuth: (v: boolean) => void;
}
const LoginModal = ({ openModal, setOpenModal, setIsAuth }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();
  const router = useRouter();

  // Функция для очистки полей
  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  // Обертка над закрытием, чтобы поля чистились всегда при выходе из модалки
  const handleClose = () => {
    resetFields();
    setOpenModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginMutation.mutateAsync({
        email,
        password,
      });

      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("refresh_token", response.refresh_token);

      window.dispatchEvent(new Event("auth-changed"));

      setIsAuth(true);

      // ⭐ Очищаем поля и закрываем модалку
      resetFields();
      setOpenModal(false);

      toast.success("Вы успешно вошли!", {
        // Исправил текст с "Регистрация" на "Вошли"
        position: "top-center",
      });

      router.push("/auth/user");
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || "Неверный email или пароль.", {
        position: "top-center",
      });
    }
  };

  if (!openModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose} // Используем handleClose здесь
    >
      <div
        className="bg-white rounded-lg w-[400px] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold w-full">Войдите в личный кабинет</h2>
          <button onClick={handleClose}>
            {" "}
            {/* И здесь */}
            <MdOutlineClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* ... инпуты остаются прежними ... */}
          <div>
            <Description>Email</Description>
            <input
              type="email"
              className="w-full border p-2 rounded-[8px] outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Description>Пароль</Description>
            <input
              type="password" // Изменил с type="text" на "password", чтобы скрыть ввод
              className="w-full border p-2 rounded-[8px] outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="bg-black text-white p-2"
            disabled={loginMutation.isPending} // Хорошая практика: отключать кнопку при загрузке
          >
            {loginMutation.isPending ? "Вход..." : "Войти"}
          </Button>

          <button type="button" className="text-red-600 text-right">
            <Link href="/auth/forget" onClick={handleClose}>
              Забыли пароль?
            </Link>
          </button>

          <Link
            href="/auth/register"
            onClick={handleClose}
            className="text-center"
          >
            Нет аккаунта?{" "}
            <span className="text-red-600 font-semibold">
              Зарегистрироваться
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
