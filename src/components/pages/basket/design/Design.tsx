"use client";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Design = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="pb-[20px] md:pb-[50px]">
      <div className="w-full border-b py-4">
        <div className="container">
          <Description className="!text-[#313131]">
            Главная / Корзина
          </Description>
        </div>
      </div>
      <div className="container">
        <div className="">
          <div className="w-full py-4">
            <TitleComponent>Корзина</TitleComponent>
          </div>
          <div className="flex flex-col-reverse md:flex-row md:items-start items-center justify-between gap-6">
            <div className="bg-white rounded-[12px] w-full flex flex-col items-center gap-2">
              <div className="w-full flex flex-col gap-4 mt-2">
                <div>
                  <Description>ФИО</Description>
                  <input
                    type="text"
                    placeholder="ФИО"
                    className="border p-2 rounded-[8px] outline-none w-full h-[40px] mt-1"
                  />
                </div>

                <div>
                  <Description>Номер телефона</Description>
                  <input
                    type="text"
                    placeholder="Номер телефона"
                    className="border p-2 rounded-[8px] outline-none w-full h-[40px] mt-1"
                  />
                </div>
                <div>
                  <Description>Номер WhatsApp (необязательно)</Description>
                  <input
                    type="text"
                    placeholder="Номер телефона"
                    className="border p-2 rounded-[8px] outline-none w-full h-[40px] mt-1"
                  />
                </div>
                <div>
                  <div className="border-[#ebebeb] border p-2 rounded-[8px] bg-[#E8E8E8] w-full md:h-[40px] h-auto mt-1">
                    <Description className="flex flex-col md:flex-row gap-1 w-full">
                      Подтверждая заказ вы принимаете
                      <div className="flex gap-1">
                        <span className="text-[#3188DE]">
                          <Link href="">Правила</Link>
                        </span>
                        и
                        <span className="text-[#3188DE]">
                          <Link href="">Условия сайта</Link>
                        </span>
                      </div>
                    </Description>
                  </div>
                </div>
              </div>

              <div className="flex justify-end w-full mt-2">
                <div className="flex justify-end w-full mt-2">
                  <Button
                    onClick={() => setIsOpen(true)}
                    className="w-full !bg-[#E60000]"
                  >
                    Подтвердить заказ
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white border rounded-[12px] md:w-[550px] w-[100%] flex flex-col gap-4 p-6">
              <div className="w-full flex flex-col gap-1 border-b pb-3">
                <Description className="font-[100] w-full">
                  Общее количество запчастей
                </Description>
                <Description className="font-[600]">
                  53 500 c (розничная)
                </Description>
                <Description className="font-[100] !text-[12px] w-full">
                  1000 х 50000 C
                </Description>
                <Description className="font-[100] !text-[12px] w-full">
                  АРТИКУЛ: X0390000047
                </Description>
              </div>
              <div className="w-full flex flex-col gap-1 border-b pb-3">
                <Description className="font-[100] w-full">
                  Общее количество запчастей
                </Description>
                <Description className="font-[600]">
                  53 500 c (розничная)
                </Description>
                <Description className="font-[100] !text-[12px] w-full">
                  1000 х 50000 C
                </Description>
                <Description className="font-[100] !text-[12px] w-full">
                  АРТИКУЛ: X0390000047
                </Description>
              </div>

              <div className="w-full flex items-center  justify-between py-6">
                <Title className="!text-[20px] font-[100]">Итого:</Title>
                <Description className="font-[500] !text-[20px]">
                  5000000c
                </Description>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[16px] p-6 md:w-[384px] w-[90%] max-w-md relative flex flex-col gap-2">
            <div className="flex w-full justify-between items-center">
              <Title className="!text-[20px]">Вы успешно оформили заказ!</Title>
              <button className="mb-8 md:mb-0" onClick={() => setIsOpen(false)}>
                <IoMdClose />
              </button>
            </div>
            <Description className="w-[250px]">
              В скором времени менеджер свяжется с Вами!
            </Description>
            <Button className=" text-white mt-4">Продолжить</Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Design;
