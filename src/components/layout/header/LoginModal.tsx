"use client";

import React, { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useLogin } from "@/redux/hooks/auth";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import Link from "next/link";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginMutation.mutateAsync({ email, password });

      //   localStorage.setItem("access_token", response.access_token);
      //   localStorage.setItem("refresh_token", response.refresh_token);

      localStorage.setItem("access_token", response.access);
      localStorage.setItem("refresh_token", response.refresh);

      setIsAuth(true); // ⭐ обновляем Header
      setOpenModal(false); // закрываем модалку

      router.push("/auth/user");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Ошибка входа");
    }
  };

  if (!openModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => setOpenModal(false)}
    >
      <div
        className="bg-white rounded-lg w-[400px] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold w-full">Войдите в личный кабинет</h2>

          <button onClick={() => setOpenModal(false)}>
            <MdOutlineClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Description>Email</Description>
            <input
              type="email"
              className="w-full border p-2 rounded outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Description>Пароль</Description>
            <input
              type="text" // вместо "password"
              className="w-full border p-2 rounded outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="bg-black text-white p-2">
            Войти
          </Button>

          <button
            type="button"
            className="text-red-600 text-right"
            onClick={() => alert("Функция восстановления пароля")}
          >
            Забыли пароль?
          </button>

          <Link href="/auth/register" className="text-center">
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
