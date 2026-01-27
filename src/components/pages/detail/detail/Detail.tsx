"use client";
import img2 from "@/assets/images/images.jpeg";
import img3 from "@/assets/images/Asim.png";
import img4 from "@/assets/svg/car.svg";
import img1 from "@/assets/svg/card2.svg";
import Image from "next/image";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useState } from "react";
// Импорт компонентов Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper"; // Импорт типа Swiper
import { Thumbs } from "swiper/modules";
// Стили Swiper
import "swiper/css";
import "swiper/css/thumbs";
import { BsCart3 } from "react-icons/bs";

const Detail = () => {
	// Правильная типизация состояния
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

	const data = [
		{
			title: "Капот для Toyota CH-R (2016-2019)",
			description:
				"Алюминиевый капот для Lixiang L7 (2023-2024), неокрашенный, с высокой устойчивостью к коррозии.",
			articul: "X0390000047",
			price: "45 500",
			old_price: "53 500",
			characteristics: [
				{
					marka: "Toyota",
					model: "CH-R",
					kuzov: "Toyota CH-R (2016-2019)",
					tipe_spare: "Капоты",
					material: "Алюминий",
					made: "Китай",
				},
			],
			images: [
				{
					image: img1,
				},
				{
					image: img2,
				},
				{
					image: img3,
				},
				{
					image: img4,
				},
			],
		},
	];

	return (
		<section className="py-6">
			<div className="container">
				<div className="">
					{data.map((el, dataIndex) => (
						<div key={dataIndex} className="">
							<TitleComponent className="!text-[30px] font-bold pb-5">
								{el.title}
							</TitleComponent>
							<div className="flex md:flex-row flex-col gap-3 items-start">
								<div className="w-full max-w-[451px]">
									{/* Основной слайдер с изображениями - без стрелок и пагинации */}
									<Swiper
										modules={[Thumbs]}
										thumbs={{
											swiper:
												thumbsSwiper && !thumbsSwiper.destroyed
													? thumbsSwiper
													: null,
										}}
										className="main-swiper rounded-[12px] overflow-hidden"
										spaceBetween={10}
										slidesPerView={1}
										loop={true}
										allowTouchMove={true}>
										{el.images.map((img, index) => (
											<SwiperSlide
												key={index}
												className="flex justify-center items-center">
												<Image
													className="w-full h-[231px] object-cover"
													src={img.image}
													alt={`Изображение ${index + 1} для ${el.title}`}
													width={451}
													height={231}
													priority={index === 0}
												/>
											</SwiperSlide>
										))}
									</Swiper>

									{/* Миниатюры (табы) - без стрелок навигации */}
									<Swiper
										onSwiper={setThumbsSwiper}
										modules={[Thumbs]}
										spaceBetween={4}
										slidesPerView={4}
										watchSlidesProgress={true}
										className="thumbs-swiper mt-3"
										loop={false}
										allowTouchMove={true} // Разрешаем свайп для миниатюр на мобильных
									>
										{el.images.slice(0, 4).map((img, index) => (
											<SwiperSlide
												key={index}
												className="!h-[64px] !flex !items-center !justify-center">
												<div className="w-full h-full rounded-[12px] overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-gray-300">
													<Image
														className="w-full h-full object-cover"
														src={img.image}
														alt={`Миниатюра ${index + 1} для ${el.title}`}
														width={110}
														height={64}
													/>
												</div>
											</SwiperSlide>
										))}
									</Swiper>
								</div>

								<div className="flex justify-between md:flex-row flex-col-reverse items-start gap-3 w-full">
									<div className="flex flex-col gap-1">
										<Description className="font-[500] !text-[14px]">
											{el.description}
										</Description>
										<Description className="!text-[14px] mt-2">
											АРТИКУЛ: <span className="font-[500]">{el.articul}</span>
										</Description>
										<Description className="font-[700] !text-[16px] mt-2">
											Характеристики
										</Description>
										{el.characteristics.map((item, index) => (
											<div className="flex flex-col gap-1" key={index}>
												<Description className="font-[500] !text-[14px]">
													Марка: {item.marka}
												</Description>
												<Description className="font-[500] !text-[14px]">
													Модель: {item.model}
												</Description>
												<Description className="font-[500] !text-[14px]">
													Кузов: {item.kuzov}
												</Description>
												<Description className="font-[500] !text-[14px]">
													Тип запчасти: {item.tipe_spare}
												</Description>
												<Description className="font-[500] !text-[14px]">
													Материал: {item.material}
												</Description>
												<Description className="font-[500] !text-[14px]">
													Производитель: {item.made}
												</Description>
											</div>
										))}
									</div>

									<div className="border rounded-[16px] p-4 w-full max-w-[484px]">
										<div className="flex mt-2 justify-between">
											<Title className="!text-[20px] font-[500]">Цена:</Title>

											<div className="flex gap-2">
												<Title className="!text-[20px] font-[500] text-[#747474] line-through">
													{el.old_price} с
												</Title>
												<Title className="!text-[20px] font-[500]">
													{el.price} с
												</Title>
											</div>
										</div>

										<div className="flex flex-col gap-2 pt-4 border-t mt-6">
											<button className="w-full flex items-center justify-center gap-1 px-4 py-2 bg-[#131316] text-[white] text-[14px] rounded-[8px]">
												<BsCart3 /> В корзину
											</button>
											<button className="w-full px-4 py-2 bg-[#E60000] text-[white] text-[14px] rounded-[8px]">
												Оформить заказ
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Detail;
