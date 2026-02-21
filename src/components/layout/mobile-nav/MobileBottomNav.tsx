"use client";

import { PAGE } from "@/config/pages/public-page.config";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { LuUserRound } from "react-icons/lu";
import { getCart } from "@/components/shared/utils/cartStorage";
import LoginModal from "@/components/layout/header/LoginModal"; // Убедитесь, что путь верный

const MobileBottomNav = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // 1. Логика корзины (как в Header)
  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart() || [];
      const count = cart.reduce((acc, el) => acc + el.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();
    window.addEventListener("cart-updated", updateCartCount);
    return () => window.removeEventListener("cart-updated", updateCartCount);
  }, []);

  // 2. Логика авторизации (как в Header)
  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(!!localStorage.getItem("access_token"));
    };
    checkAuth();
    window.addEventListener("auth-changed", checkAuth);
    return () => window.removeEventListener("auth-changed", checkAuth);
  }, []);

  return (
    <div className="flex bg-white p-3 z-50 justify-between border-t sticky bottom-0 left-0">
      <Link href={PAGE.HOME}>
        <button className="relative w-[40px] h-[40px] text-[25px] border rounded-[8px] flex items-center justify-center">
          <GoHome />
        </button>
      </Link>

      {/* Кнопка Корзины с динамическим счетчиком */}
      <Link href={PAGE.BASKET}>
        <button className="relative w-[40px] h-[40px] text-[25px] border rounded-[8px] flex items-center justify-center">
          <BsCart3 />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[12px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-[4px]">
              {cartCount}
            </span>
          )}
        </button>
      </Link>

      {/* Кнопка Профиля / Логина */}
      {isAuth ? (
        <Link
          href="/auth/user"
          className="flex justify-center items-center  border rounded-[8px] text-[25px] w-[40px] h-[40px]"
        >
          <LuUserRound />
        </Link>
      ) : (
        <button
          onClick={() => setOpenModal(true)}
          className="flex justify-center items-center border rounded-[8px] text-[20px] w-[40px] h-[40px]"
        >
          <LuUserRound />
        </button>
      )}

      {/* Модалка логина (рендер внизу, чтобы не ломать флекс-сетку) */}
      <LoginModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setIsAuth={setIsAuth}
      />
    </div>
  );
};

export default MobileBottomNav;
