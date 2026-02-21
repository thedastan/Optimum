"use client";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { BsCart3 } from "react-icons/bs";
import Image from "next/image";
import Button from "@/components/ui/button/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useProducts } from "@/redux/hooks/product";
import { addToCart, getCart } from "@/components/shared/utils/cartStorage";
import { useRouter, useSearchParams } from "next/navigation";
import { IProduct } from "@/redux/models/product.model";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";
import { useEffect, useState } from "react";
import { PHONE_NUMBER_LINK } from "@/constants/admin";

const Search_card = () => {
  const { data, isLoading } = useProducts();
  const searchParams = useSearchParams();

  const [cart, setCart] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const rawQuery = searchParams.get("query") || "";
  const query = decodeURIComponent(rawQuery).toLowerCase().trim();

  // Логика фильтрации
  const filteredProducts =
    data?.filter((product: IProduct) => {
      if (!query) return true;

      const spareName = product.parts?.spare_name?.toLowerCase().trim() || "";
      const productName = product.product_name?.toLowerCase().trim() || "";
      const article = product.article?.toLowerCase().trim() || "";

      return (
        spareName.includes(query) ||
        productName.includes(query) ||
        article.includes(query)
      );
    }) || [];

  // Красивое имя для заголовка
  const displayTitle =
    filteredProducts.length > 0 && query
      ? filteredProducts[0].parts?.spare_name?.toLowerCase().includes(query)
        ? filteredProducts[0].parts?.spare_name
        : query
      : query;

  return (
    <section className="py-[20px] md:py-[50px]">
      <div className="container">
        {/* Заголовок: Только если товары найдены */}
        {!isLoading && filteredProducts.length > 0 && (
          <div className="mb-6">
            <TitleComponent>
              {query
                ? `${displayTitle.charAt(0).toUpperCase() + displayTitle.slice(1)} - ${filteredProducts.length} результата`
                : `Все товары — ${filteredProducts.length}`}
            </TitleComponent>
          </div>
        )}

        {/* Блок "Ничего не найдено" */}
        {!isLoading && query && filteredProducts.length === 0 && (
          <div className="w-full flex flex-col items-center gap-6 py-10">
            {/* Надписи сверху нет, только карточка */}
            <TitleComponent>
              {query
                ? `${displayTitle.charAt(0).toUpperCase() + displayTitle.slice(1)} - ${filteredProducts.length} результатов поиска`
                : `Все товары — ${filteredProducts.length}`}
            </TitleComponent>
            <div className="w-full max-w-[420px] p-8 border rounded-[12px] flex flex-col items-center gap-[24px]">
              <Title className="!text-[24px] text-center">
                Не нашли нужный товар?
              </Title>
              <Description className="!text-[14px] text-center">
                Запчасти «{query}» пока нет в каталоге. Свяжитесь с нами, и мы
                подберем её для вас!
              </Description>
              <Link
                target="_blank"
                href={PHONE_NUMBER_LINK}
                className="!w-[110px]"
              >
                <Button className="!w-[110px]">Связаться</Button>
              </Link>
            </div>
          </div>
        )}

        {/* Сетка товаров */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-[22px]">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-100 h-[250px] rounded-[20px]"
                />
              ))
            : filteredProducts.map((el, i) => {
                const isInCart = cart.some((item) => item.id === el.id);
                return (
                  <Link
                    href={`/detail/${el.slug}`}
                    key={el.id}
                    className="flex flex-col gap-[14px] h-full"
                  >
                    <div className="flex flex-col gap-[6px] flex-1">
                      <div className="relative w-full">
                        <Swiper
                          modules={[Pagination]}
                          pagination={{
                            clickable: true,
                            el: `.custom-pagination-${i}`,
                            renderBullet: (_, className) =>
                              `<span class="${className} custom-dot"></span>`,
                          }}
                          className="w-full"
                        >
                          {el.images.map((item, idx) => (
                            <SwiperSlide key={idx}>
                              <div className="w-full h-[157px] overflow-hidden rounded-t-[20px]">
                                <Image
                                  src={item.image}
                                  alt="img"
                                  width={300}
                                  height={200}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>

                        {el.discount && (
                          <h2 className="absolute top-0 left-0 z-10 flex justify-center text-[16px] text-white bg-[#E60000] rounded-[20px] px-3 py-2">
                            -
                            {Math.round(
                              ((el.price - el.discount) / el.price) * 100,
                            )}
                            %
                          </h2>
                        )}
                      </div>

                      <div
                        className={`custom-pagination-${i} flex justify-center`}
                      ></div>
                    </div>

                    <div className="flex flex-col gap-[6px] flex-1">
                      <Title className="font-[100]">{el.product_name}</Title>

                      <div className="flex items-center gap-1">
                        {el.discount ? (
                          <>
                            <Title>{el.discount}c</Title>
                            <Title className="text-[#747474] line-through">
                              {el.price}c
                            </Title>
                          </>
                        ) : (
                          <Title>{el.price}c</Title>
                        )}
                      </div>

                      <Description className="!text-[12px]">
                        АРТИКУЛ: {el.article}
                      </Description>
                    </div>

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
                      className={`flex items-center gap-2 mt-auto ${
                        isInCart ? "" : ""
                      }`}
                    >
                      {isInCart ? "Перейти в" : "В корзину"}
                      <BsCart3 />
                    </Button>
                  </Link>
                );

                // <Link
                //   href={`/detail/${el.slug}`}
                //   key={el.id}
                //   className="flex flex-col gap-[14px] h-full"
                // >
                //   <div className="flex flex-col gap-[6px] flex-1">
                //     <div className="relative w-full">
                //       <Swiper
                //         modules={[Pagination]}
                //         pagination={{
                //           clickable: true,
                //           el: `.custom-pagination-${i}`,
                //           renderBullet: (_, className) =>
                //             `<span class="${className} custom-dot"></span>`,
                //         }}
                //         className="w-full"
                //       >
                //         {el.images?.map((item, idx) => (
                //           <SwiperSlide key={idx}>
                //             <div className="w-full h-[157px] overflow-hidden rounded-t-[20px]">
                //               <Image
                //                 src={item.image}
                //                 alt={el.product_name}
                //                 width={300}
                //                 height={200}
                //                 className="object-cover w-full h-full"
                //                 priority={i < 4}
                //               />
                //             </div>
                //           </SwiperSlide>
                //         ))}
                //       </Swiper>
                //       {el.discount > 0 && (
                //         <h2 className="absolute top-0 left-0 z-10 text-white bg-[#E60000] rounded-[20px] px-3 py-1 text-[14px]">
                //           -
                //           {Math.round(
                //             ((el.price - el.discount) / el.price) * 100,
                //           )}
                //           %
                //         </h2>
                //       )}
                //     </div>
                //     <div
                //       className={`custom-pagination-${i} flex justify-center mt-1`}
                //     ></div>
                //   </div>

                //   <div className="flex flex-col gap-[6px] flex-1">
                //     <Title className="font-[400] text-[16px] line-clamp-2">
                //       {el.product_name}
                //     </Title>
                //     <div className="flex items-center gap-1">
                //       {el.discount ? (
                //         <>
                //           <Title className="!text-red-600">
                //             {el.discount}c
                //           </Title>
                //           <Title className="text-[#747474] line-through text-[12px]">
                //             {el.price}c
                //           </Title>
                //         </>
                //       ) : (
                //         <Title>{el.price}c</Title>
                //       )}
                //     </div>
                //     <Description className="text-[12px]">
                //       АРТИКУЛ: {el.article}
                //     </Description>
                //   </div>

                //   <Button
                //     onClick={(e) => {
                //       e.preventDefault();
                //       addToCart({ ...el, quantity: 1 });
                //       toast.success("Добавлено в корзину");
                //     }}
                //     className="flex items-center gap-2 mt-auto"
                //   >
                //     <BsCart3 /> В корзину
                //   </Button>
                // </Link>
              })}
        </div>
      </div>
    </section>
  );
};

export default Search_card;
