"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/assets/svg/logo.svg";
import instagram from "@/assets/svg/instagram__logo.svg";
import telegram from "@/assets/svg/telegram__logo.svg";
import whatsapp from "@/assets/svg/watsapp_logo.svg";
import { Description } from "@/components/ui/text/Description";
import { CiLocationOn } from "react-icons/ci";
import { BsCart3, BsTelephone } from "react-icons/bs";
import { AiOutlineAppstore } from "react-icons/ai";
import Button from "@/components/ui/button/Button";
import { LuSearch, LuUserRound } from "react-icons/lu";
import Link from "next/link";
import { PAGE } from "@/config/pages/public-page.config";
import {
  LOCATION,
  LOCATION_LINK,
  PHONE_NUMBER,
  PHONE_NUMBER_LINK,
} from "@/constants/admin";
import { MdOutlineClose } from "react-icons/md";
import LoginModal from "./LoginModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useLogout } from "@/redux/hooks/auth";
import { RiLogoutBoxLine } from "react-icons/ri";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const logout = useLogout();

  const [isAuth, setIsAuth] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || "",
  );

  // Синхронизация инпута с URL при переходе назад/вперед
  useEffect(() => {
    setSearchQuery(searchParams.get("query") || "");
  }, [searchParams]);

  useEffect(() => {
    const checkAuth = () => {
      setIsAuth(!!localStorage.getItem("access_token"));
    };
    checkAuth();
    window.addEventListener("auth-changed", checkAuth);
    return () => window.removeEventListener("auth-changed", checkAuth);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    router.push(PAGE.HOME);
  };

  return (
    <header className="w-full top-0 left-0 sticky bg-white z-50">
      <div className="border-b py-3">
        <div className="container flex justify-between items-center">
          <Link href={PAGE.HOME}>
            <Image className="w-[118px] md:w-fit" src={logo} alt="logo" />
          </Link>

          <div className="flex items-center gap-[16px]">
            <div className="flex gap-[16px]">
              <Image className="md:flex hidden" src={telegram} alt="" />
              <Image className="md:flex hidden" src={instagram} alt="" />
              <Image className="md:flex hidden" src={whatsapp} alt="" />
            </div>

            <div className="flex flex-col gap-[8px]">
              <Link href={LOCATION_LINK} target="_blank">
                <Description className="flex items-center gap-1 text-[14px]">
                  <CiLocationOn size={20} /> {LOCATION}
                </Description>
              </Link>
              <Link href={PHONE_NUMBER_LINK} target="_blank">
                <Description className="flex items-center gap-1 ml-1">
                  <BsTelephone /> {PHONE_NUMBER}
                </Description>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b py-3">
        <div className="container flex justify-between items-center gap-[24px]">
          <Button className="!w-[250px] md:flex hidden bg-[#E60000]">
            <Link className="flex gap-2 items-center" href={PAGE.CATALOG}>
              <AiOutlineAppstore /> Каталог запчастей
            </Link>
          </Button>

          <form
            onSubmit={handleSearch}
            className="w-full flex flex-col relative"
          >
            <div className="relative w-full">
              <input
                className="w-full h-[40px] p-[10px] border rounded-[8px] outline-none"
                placeholder="Поиск запчастей"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-0 top-0 flex w-[80px]">
                {/* Кнопка очистки: теперь не исчезает из DOM, а меняет opacity */}
                <button
                  type="button"
                  onClick={clearSearch}
                  className={`w-[40px] h-[40px] flex items-center justify-center transition-opacity duration-200 
                    ${searchQuery ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                >
                  <MdOutlineClose />
                </button>

                <button
                  type="submit"
                  className="w-[40px] h-[40px] bg-black text-white rounded-[8px] flex items-center justify-center"
                >
                  <LuSearch />
                </button>
              </div>
            </div>
          </form>

          <div className="md:flex hidden gap-[10px]">
            <Link href={PAGE.BASKET}>
              <button className="w-[40px] h-[40px] border rounded-[8px] flex items-center justify-center">
                <BsCart3 />
              </button>
            </Link>

            {!isAuth ? (
              <button
                onClick={() => setOpenModal(true)}
                className="w-[40px] h-[40px] border rounded-[8px] flex items-center justify-center"
              >
                <LuUserRound />
              </button>
            ) : (
              <Link href="/auth/user">
                <button className="w-[40px] h-[40px] border rounded-[8px] flex items-center justify-center">
                  <LuUserRound />
                </button>
              </Link>
            )}

            {isAuth && (
              <button
                onClick={() => {
                  logout();
                  window.dispatchEvent(new Event("auth-changed"));
                  setIsAuth(false);
                  router.push("/");
                  toast.success("Вы вышли", { position: "top-center" });
                }}
                className="px-4 h-[40px] border rounded-[8px]"
              >
                <RiLogoutBoxLine />
              </button>
            )}

            <LoginModal
              openModal={openModal}
              setOpenModal={setOpenModal}
              setIsAuth={setIsAuth}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
