"use client";

import Image from "next/image";
import React, { useState } from "react";
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
import { Title } from "@/components/ui/text/Title";
import { IoMdClose } from "react-icons/io";
import { LOCATION, LOCATION_LINK, PHONE_NUMBER, PHONE_NUMBER_LINK } from "@/constants/admin";

const Header = () => {
	const [isLoginOpen, setIsLoginOpen] = useState(false);

	const toggleLogin = () => setIsLoginOpen((prev) => !prev);

	return (
		<header className="w-full top-0 left-0 sticky bg-white z-50">
			{/* Верхняя панель */}
			<div className="border-b py-3">
				<div className="container">
					<div className="flex justify-between items-center">
						<Link href={PAGE.HOME}>
							<Image className="w-[118px] md:w-fit" src={logo} alt="logo" />
						</Link>
						<div className="flex items-center gap-[16px]">
							<div className="flex gap-[16px]">
								<Image
									className="md:flex hidden"
									src={telegram}
									alt="telegram"
								/>
								<Image
									className="md:flex hidden"
									src={instagram}
									alt="instagram"
								/>
								<Image
									className="md:flex hidden"
									src={whatsapp}
									alt="whatsapp"
								/>
							</div>
							<div className="flex flex-col gap-[8px]">
								<Link href={LOCATION_LINK} target={"_blank"}>
									<Description className="flex items-center gap-1 text-[14px]">
										<CiLocationOn size={20} /> {LOCATION}
									</Description>
								</Link>

								<Link href={PHONE_NUMBER_LINK} target="_blank">
									<Description className="flex items-center gap-1 ml-1">
										<BsTelephone />  {PHONE_NUMBER}
									</Description>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Нижняя панель */}
			<div className="border-b py-3">
				<div className="container">
					<div className="flex justify-between items-center gap-[24px]">
						<Button className="!w-[250px] md:flex hidden items-center bg-[#E60000]">
							<Link className="flex gap-2 items-center" href={PAGE.CATALOG}>
								<AiOutlineAppstore className="text-[20px]" />
								Каталог запчастей
							</Link>
						</Button>
						<Button className="!w-[50px] md:hidden flex items-center bg-[#E60000]">
							<Link
								className="flex items-center justify-center"
								href={PAGE.CATALOG}>
								<AiOutlineAppstore className="text-[25px] font-[600]" />
							</Link>
						</Button>

						<div className="w-full flex justify-end relative">
							<input
								className="w-full h-[40px] p-[10px] border rounded-[8px] outline-none"
								type="text"
								placeholder="Поиск запчастей"
							/>
							<button className="w-[40px] h-[40px] absolute flex items-center justify-center bg-black text-white rounded-[8px]">
								<LuSearch className="text-[18px]" />
							</button>
						</div>

						<div className="md:flex hidden items-center gap-[10px]">
							<Link href={PAGE.BASKET}>
								<button className="w-[40px] h-[40px] flex items-center justify-center border bg-none rounded-[8px]">
									<BsCart3 className="text-[18px]" />
								</button>
							</Link>
							<Link href={PAGE.PROFILE}>
								<button
									className="w-[40px] h-[40px] flex items-center justify-center border bg-none rounded-[8px]"
									// onClick={toggleLogin}
								>
									<LuUserRound className="text-[18px]" />
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Модальное окно */}
			{/* {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 md:w-[384px] w-[90%] max-w-md relative flex flex-col gap-2">
            <div className="flex w-full justify-between items-center">
              <Title className="!text-[20px]">Войдите в личный кабинет</Title>
              <button className="" onClick={toggleLogin}>
                <IoMdClose />
              </button>
            </div>
            <form className="flex flex-col gap-2">
              <div className="">
                <Description>Email</Description>
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-2 rounded-[8px] outline-none w-full h-[40px]"
                />
              </div>
              <div className="">
                <Description>Пароль</Description>
                <input
                  type="password"
                  placeholder="Пароль"
                  className="border p-2 rounded-[8px] outline-none w-full h-[40px]"
                />
              </div>
              <Button className=" text-white mt-4">Войти</Button>
              <Link
                className="text-[14px] text-[#E60000] font-[600] w-full flex justify-end"
                href="/auth/forget"
              >
                Забыли пароль?
              </Link>
              <Link
                className="text-[14px] w-full flex justify-center gap-2"
                href="/auth/register"
              >
                Нету аккаунта?
                <span className="text-[#E60000] font-[600]">
                  Зарегистрироваться
                </span>
              </Link>
            </form>
          </div>
        </div>
      )} */}
		</header>
	);
};

export default Header;
