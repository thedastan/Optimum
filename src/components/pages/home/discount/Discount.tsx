import React from "react";
import autumn from "@/assets/svg/autumn.svg";
import autumn2 from "@/assets/svg/autumn2.svg";

import car from "@/assets/svg/car.svg";
import wheel from "@/assets/svg/wheel.svg";
import indicator from "@/assets/svg/indicator.svg";

import Image from "next/image";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";

const Discount = () => {
  return (
    <section className="py-[20px] md:py-[40px]">
      <div className="container">
        <div className="flex w-full md:h-[310px] h-[140px]  overflow-hidden relative justify-center items-center bg-gradient-to-r from-[#FFBF95] to-[#FFEEE3] rounded-[8px]">
          <div className="flex justify-between overflow-hidden   w-full h-full">
            <Image
              className="w-[150px] md:w-[200px] md:mt-[100px] mb-[-50px] md:ml-0 ml-[-20px]"
              src={autumn}
              alt="img"
            />
            <Image
              className=" w-[170px] md:w-[356px] md:mb-[5px] md:mr-[10px] mb-0 mt-[-90px] mr-[-80px]"
              src={autumn2}
              alt="img"
            />
          </div>
          <div className="absolute flex justify-end w-full h-full overflow-hidden">
            <Image
              className="w-[105px] md:w-[162px] md:mt-[160px] md:ml-[-100px] mb-[-90px] ml-0"
              src={wheel}
              alt="img"
            />
            <Image
              className="mb-[160px] ml-[-80px] md:flex hidden"
              src={indicator}
              alt="img"
            />
            <Image
              className="mr-[60px] mt-[35px] md:flex hidden"
              src={car}
              alt="img"
            />
          </div>
          <div className="flex flex-col justify-center absolute z-10 w-full h-full">
            <div className="md:ml-[100px] ml-[20px] md:mb-[80px] mb-[30px]">
              <TitleComponent className="md:!text-[48px] !text-[20px]">
                <span className="text-[#E60000]">Скидки</span> к осени!
              </TitleComponent>
              <Description className="md:w-[420px] hidden md:flex w-full mt-[20px] md:!text-[14px] !text-[12px]">
                Кузовные запчасти для ведущих автомобильных марок: Toyota,
                Hyundai, Geely, Chery, KIA, Chevrolet и других. Надежное
                качество и широкий выбор для вашего авто!
              </Description>
              <Description className="w-[270px] flex md:hidden mt-[10px] md:!text-[14px] !text-[12px]">
                Кузовные запчасти для ведущих автомобильных марок: Toyota,
                Hyundai, Geely
              </Description>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discount;
