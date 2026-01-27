import logo from "@/assets/svg/logo.svg";
import telegram from "@/assets/svg/telegram__logo.svg";
import instagram from "@/assets/svg/instagram__logo.svg";
import whatsapp from "@/assets/svg/watsapp_logo.svg";
import Image from "next/image";
import Button from "@/components/ui/button/Button";
import { Title } from "@/components/ui/text/Title";
import { Description } from "@/components/ui/text/Description";
import { BsCart3 } from "react-icons/bs";
import { LuUserRound } from "react-icons/lu";
import { GoHome } from "react-icons/go";
import Link from "next/link";
import { LOCATION_LINK, PHONE_NUMBER, PHONE_NUMBER_LINK } from "@/constants/admin";

const Footer = () => {
	return (
		<footer className="md:pb-[50px] pb-[10px] pt-[30px]">
			<div className="flex">
				<div className="container">
					<div className="w-full flex flex-col md:gap-[50px] gap-[20px]">
						<div className="flex md:flex-row flex-col justify-between gap-[30px] md:gap-0">
							<div className="flex flex-col gap-4 w-[210px]">
								<Image src={logo} alt="img" />

								<div className="flex gap-4 ">
									<Image src={telegram} alt="img" />
									<Image src={instagram} alt="img" />
									<Image src={whatsapp} alt="img" />
								</div>

								<Button className="md:flex hidden">Построить маршрут</Button>
							</div>

							<div className="flex gap-6 md:flex-row flex-col">
								<div className="flex flex-col md:gap-4 gap-[10px] !text-[#3e3f41]">
									<Title>Разделы</Title>
									<Description className="mt-4">Марки машин</Description>
									<Description>Акции</Description>
									<Description>Популярные товары</Description>
									<Description>Политика конфиденциальности</Description>
									<Description>Публичная оферта</Description>
									<Description>Пользовательское соглашение</Description>
								</div>
								<div className="flex flex-col md:gap-4 gap-[10px] !text-[#3e3f41]">
									<Title>Контакты</Title>
									<Link href={PHONE_NUMBER_LINK}>
										<Description className="mt-4">
											Телефон: {PHONE_NUMBER}
										</Description>
									</Link>
									<Link href={LOCATION_LINK}>
										<Description className="!w-[270px] first-line:">
											Адрес: Бишкек, IT HUB 'Technopark', Горького 1/2, <br /> 2
											этаж
										</Description>
									</Link>
								</div>
							</div>

							<div className="flex flex-col items-center justify-center gap-4 md:w-[420px] w-full h-[176px] border rounded-[10px]">
								<Title className="!text-[24px]">Не нашли нужный товар?</Title>
								<Description className="!text-[#3e3f41]">
									Свяжитесь с нами для заказа
								</Description>
								<Button className="!w-[110px]">Связаться</Button>
							</div>
						</div>
						<div className="bg-[#CDD5DF] w-full h-[0.8px]"></div>
						<div className="w-full flex justify-center">
							<Description className="text-[#697586] !text-[12px]">
								Copyright ©2025 ALFA Optimum LLC, Все права защищены.
								Зарегистрировано в Министерстве юстиции КР
							</Description>
						</div>
					</div>
				</div>
			</div>
		 
		</footer>
	);
};

export default Footer;
