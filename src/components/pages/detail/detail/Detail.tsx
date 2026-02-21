"use client";

import Image from "next/image";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/thumbs";

import { BsCart3 } from "react-icons/bs";
import { useProductBySlug } from "@/redux/hooks/product";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { addToCart, getCart } from "@/components/shared/utils/cartStorage";
import Link from "next/link";

const Detail = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const router = useRouter();

  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const updateCart = () => {
      setCart(getCart());
    };

    updateCart(); // при первом рендере
    window.addEventListener("cart-updated", updateCart);

    return () => {
      window.removeEventListener("cart-updated", updateCart);
    };
  }, []);

  const params = useParams();

  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray(params?.slug)
        ? params.slug[0]
        : "";

  const { data, isLoading } = useProductBySlug(slug);
  console.log(data, "data data");

  // ✅ Skeleton
  if (isLoading) {
    return (
      <section className="py-6 animate-pulse">
        <div className="container">
          <div className="h-8 w-1/2 bg-gray-200 rounded mb-6" />

          <div className="flex md:flex-row flex-col gap-3">
            {/* Фото */}
            <div className="w-full max-w-[451px]">
              <div className="h-[231px] bg-gray-200 rounded-[12px]" />
              <div className="flex gap-2 mt-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[64px] w-full bg-gray-200 rounded-[12px]"
                  />
                ))}
              </div>
            </div>

            {/* Инфо */}
            <div className="flex flex-col gap-3 w-full">
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
              <div className="h-4 w-1/3 bg-gray-200 rounded" />

              <div className="border rounded-[16px] p-4 mt-4">
                <div className="h-5 w-1/2 bg-gray-200 rounded mb-4" />
                <div className="h-10 bg-gray-200 rounded mb-2" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  const el = data;
  const finalPrice = el.price - el.discount;
  const isInCart = cart.some((item) => item.id === el.id);

  return (
    <section className="py-6">
      <div className="container">
        <TitleComponent className="!text-[30px] font-bold pb-5">
          {el.product_name}
        </TitleComponent>

        <div className="flex md:flex-row flex-col gap-3 items-start">
          {/* Слайдер */}
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

          {/* Информация */}
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

            {/* Цена */}
            <div className="border flex flex-col rounded-[16px] p-4 w-full h-full max-w-[484px]">
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
                <Button
                  onClick={(e) => {
                    e.preventDefault();

                    if (isInCart) {
                      router.push("/basket");
                      return;
                    }

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
                    setCart(getCart());
                    window.dispatchEvent(new Event("cart-updated"));
                  }}
                  className="flex items-center gap-2 mt-auto"
                >
                  {isInCart ? "Перейти в" : "В корзину"}
                  <BsCart3 />
                </Button>

                <Button className="w-full !bg-[#E60000]">
                  <Link
                    href={{
                      pathname: "/basket/design",
                      query: {
                        product: JSON.stringify({
                          id: el.id,
                          product_name: el.product_name,
                          price: el.price,
                          discount: el.discount,
                          article: el.article,
                          quantity: 1,
                        }),
                      },
                    }}
                  >
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
