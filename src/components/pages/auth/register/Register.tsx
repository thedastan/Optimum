"use client";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import React, { useState } from "react";
import { Description } from "@/components/ui/text/Description";
import Button from "@/components/ui/button/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // шаги форм

  const togglePassword = () => setShowPassword((prev) => !prev);
  const nextStep = () => setStep((prev) => prev + 1);

  return (
    <section className="bg-[#F5F5F5] py-10">
      <div className="flex justify-center flex-col items-center gap-4">
        {/* Шаг 1: Регистрация */}
        {step === 1 && (
          <div className="bg-white border rounded-[12px] md:w-[425px] w-[90%] flex flex-col items-center gap-2 p-6">
            <TitleComponent className="!text-[24px] w-full text-center">
              Регистрация
            </TitleComponent>
            <Description className="w-full text-center">
              Заполните данные и нажмите кнопку регистрации
            </Description>
            <form className="w-full flex flex-col gap-4 mt-2">
              <div>
                <Description>
                  ФИО <span className="text-[#E60000] font-[600]">*</span>
                </Description>
                <input
                  type="text"
                  placeholder="ФИО"
                  className="border p-2 rounded-[8px] outline-none w-full h-[40px]"
                />
              </div>
              <div>
                <Description>
                  Email <span className="text-[#E60000] font-[600]">*</span>
                </Description>
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-2 rounded-[8px] outline-none w-full h-[40px]"
                />
              </div>
              <div>
                <Description>
                  Номер телефона{" "}
                  <span className="text-[#E60000] font-[600]">*</span>
                </Description>
                <input
                  type="text"
                  placeholder="Номер телефона"
                  className="border p-2 rounded-[8px] outline-none w-full h-[40px]"
                />
              </div>
              <div>
                <Description>
                  Пароль <span className="text-[#E60000] font-[600]">*</span>
                </Description>
                <div className="relative w-full flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Пароль"
                    className="border p-2 flex rounded-[8px] outline-none w-full h-[40px] pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <AiFillEye size={20} />
                    ) : (
                      <AiFillEyeInvisible size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Description>
                  Подтверждение пароля{" "}
                  <span className="text-[#E60000] font-[600]">*</span>
                </Description>
                <div className="relative w-full flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Подтверждение пароля"
                    className="border p-2 flex rounded-[8px] outline-none w-full h-[40px] pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <AiFillEye size={20} />
                    ) : (
                      <AiFillEyeInvisible size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end w-full mt-2">
                <Button
                  type="button"
                  className="md:!w-[178px] w-full"
                  onClick={nextStep}
                >
                  Продолжить
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Шаг 2: Восстановление пароля */}
        {step === 2 && (
          <div className="bg-white border rounded-[12px] md:w-[425px] w-[90%] flex flex-col items-center gap-4 p-6">
            <TitleComponent className="!text-[24px] w-full text-center">
              Восстановление пароля
            </TitleComponent>
            <Description className="w-full text-center">
              Введите почту для восстановления пароля
            </Description>
            <form className="w-full flex flex-col gap-4 mt-2">
              <div>
                <Description>
                  Email <span className="text-[#E60000] font-[600]">*</span>
                </Description>
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-2 rounded-[8px] outline-none w-full h-[40px]"
                />
              </div>
              <div className="flex justify-end w-full mt-2">
                <Button
                  type="button"
                  className="md:!w-[178px] w-full"
                  onClick={nextStep}
                >
                  Далее
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Шаг 3: Проверьте почту */}
        {step === 3 && (
          <div className="bg-white border rounded-[12px] md:w-[430px] w-[90%] flex flex-col items-center gap-4 p-6">
            <TitleComponent className="!text-[24px] w-full text-center">
              Проверьте почту
            </TitleComponent>
            <Description className="w-full text-center">
              Мы отправили ссылку для восстановления пароля
            </Description>
            <div className="flex justify-end w-full mt-2">
              <Button type="button" className="md:!w-[186px] w-full">
                <Link href="user"> Далее</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Register;
