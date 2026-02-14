"use client";

import Image from "next/image";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/thumbs";

import { BsCart3 } from "react-icons/bs";
import { useProductBySlug } from "@/redux/hooks/product";
import { useParams } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { addToCart } from "@/components/shared/utils/cartStorage";
import Link from "next/link";

const Detail = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const params = useParams();

  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray(params?.slug)
        ? params.slug[0]
        : "";

  const { data, isLoading } = useProductBySlug(slug);

  console.log(slug, "slug");
  console.log(data, "detail data");

  if (!data) return null;

  const el = data;
  const finalPrice = el.price - el.discount;

  return (
    <section className="py-6">
      <div className="container">
        <TitleComponent className="!text-[30px] font-bold pb-5">
          {el.product_name}
        </TitleComponent>

        <div className="flex md:flex-row flex-col gap-3 items-start">
          {/* ===== Слайдер ===== */}
          <div className="w-full max-w-[451px]">
            <Swiper
              modules={[Thumbs]}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              className="rounded-[12px] overflow-hidden"
              spaceBetween={10}
              slidesPerView={1}
              loop
            >
              {el.images.map((img, index) => (
                <SwiperSlide key={img.id}>
                  <Image
                    src={img.image}
                    alt={el.product_name}
                    width={451}
                    height={231}
                    className="w-full h-[231px] object-cover"
                    priority={index === 0}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Миниатюры */}
            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[Thumbs]}
              spaceBetween={4}
              slidesPerView={4}
              watchSlidesProgress
              className="mt-3"
            >
              {el.images.slice(0, 4).map((img) => (
                <SwiperSlide key={img.id}>
                  <div className="h-[64px] rounded-[12px] overflow-hidden border">
                    <Image
                      src={img.image}
                      alt="preview"
                      width={110}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* ===== Информация ===== */}
          <div className="flex justify-between md:flex-row flex-col-reverse gap-3 w-full">
            <div className="flex flex-col gap-1">
              <Description className="font-[500]">{el.description}</Description>

              <Description>
                АРТИКУЛ:
                <span className="font-[500] ml-1">{el.article}</span>
              </Description>

              <Description className="font-[700] mt-2">
                Характеристики
              </Description>

              <Description>Марка: {el.brand.brand_name}</Description>
              <Description>Модель: {el.model.model_name}</Description>
              <Description>Кузов: {el.body.type_name}</Description>
              <Description>Тип запчасти: {el.parts.spare_name}</Description>
              <Description>Материал: {el.material.material_name}</Description>
              <Description>
                Производитель: {el.country.country_name}
              </Description>
            </div>

            {/* ===== Цена ===== */}
            <div className="border flex flex-col justify-start h-full rounded-[16px] p-4 w-full max-w-[484px]">
              <div className="flex justify-between">
                <Title>Цена:</Title>

                <div className="flex gap-2">
                  {el.discount > 0 && (
                    <Title className="line-through text-[#747474]">
                      {el.price} с
                    </Title>
                  )}
                  <Title>{finalPrice} с</Title>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t mt-6">
                {/* <button className="flex items-center justify-center gap-1 px-4 py-2 bg-[#131316] text-white rounded-[8px]">
                  <BsCart3 /> В корзину
                </button> */}
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart({
                      id: el.id,
                      product_name: el.product_name,
                      price: el.price,
                      discount: el.discount,
                      slug: el.slug,
                      article: el.article,
                      images: el.images,
                      quantity: 1,
                    });
                  }}
                  className="flex items-center gap-2 mt-auto"
                >
                  <BsCart3 /> В корзину
                </Button>

                <Button className="w-full !bg-[#E60000]">
                  <Link className="w-full py-1" href="/basket/design">
                    Оформить заказ
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
