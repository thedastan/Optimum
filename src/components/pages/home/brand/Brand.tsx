import { Description } from "@/components/ui/text/Description";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import React from "react";

import Image from "next/image";
import { Title } from "@/components/ui/text/Title";

import brand_img from "@/assets/svg/brand.svg";
import brand_img2 from "@/assets/svg/brand2.svg";
import brand_img3 from "@/assets/svg/brand3.svg";
import brand_img4 from "@/assets/svg/brand4.svg";
import brand_img5 from "@/assets/svg/brand5.svg";
import brand_img6 from "@/assets/svg/brand6.svg";
import brand_img7 from "@/assets/svg/brand7.svg";
import brand_img8 from "@/assets/svg/brand8.svg";
import brand_img9 from "@/assets/svg/brand9.svg";
import brand_img10 from "@/assets/svg/brand10.svg";
import brand_img11 from "@/assets/svg/brand11.svg";
import brand_img12 from "@/assets/svg/brand12.svg";
import brand_img13 from "@/assets/svg/brand13.svg";
import brand_img14 from "@/assets/svg/brand14.svg";
import brand_img15 from "@/assets/svg/brand15.svg";
import brand_img16 from "@/assets/svg/brand16.svg";
import brand_img17 from "@/assets/svg/brand17.svg";
import brand_img18 from "@/assets/svg/brand18.svg";

const data = [
  {
    img: brand_img,
    text: "Audi",
  },
  {
    img: brand_img2,
    text: "BMW",
  },
  {
    img: brand_img3,
    text: "Chevrolet",
  },
  {
    img: brand_img4,
    text: "Chrysler",
  },
  {
    img: brand_img5,
    text: "Ford",
  },
  {
    img: brand_img6,
    text: "Honda",
  },
  {
    img: brand_img7,
    text: "Hyundai",
  },
  {
    img: brand_img8,
    text: "Infinity",
  },
  {
    img: brand_img9,
    text: "KIA",
  },
  {
    img: brand_img10,
    text: "Lexus",
  },
  {
    img: brand_img11,
    text: "Mazda",
  },
  {
    img: brand_img12,
    text: "Mercedes",
  },
  {
    img: brand_img13,
    text: "Mitsubishi",
  },
  {
    img: brand_img14,
    text: "Nissan",
  },
  {
    img: brand_img15,
    text: "Opel",
  },
  {
    img: brand_img16,
    text: "Subaru",
  },
  {
    img: brand_img17,
    text: "Toyota",
  },
  {
    img: brand_img18,
    text: "Volkswagen",
  },
];

const Brand = () => {
  return (
    <section className="py-[30px] md:py-[50px]">
      <div className="container">
        <div className="">
          <div className="">
            <TitleComponent>Кузовные автозапчасти для иномарок</TitleComponent>
            <Description className="mt-[12px]">
              Выберите марку машины
            </Description>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mt-[12px]">
            {data.map((el, index) => (
              <div
                key={index}
                className="w-full h-[120px] border rounded-[8px] flex flex-col justify-center items-center gap-[8px]"
              >
                <Image src={el.img} alt="img" />
                <Title>{el.text}</Title>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brand;
