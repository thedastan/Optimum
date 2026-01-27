"use client";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import React, { useState } from "react";
import { Description } from "@/components/ui/text/Description";
import Button from "@/components/ui/button/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";

const Forget = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // шаги форм

  const togglePassword = () => setShowPassword((prev) => !prev);
  const nextStep = () => setStep((prev) => prev + 1);

  return (
    <section className="bg-[#F5F5F5] py-10">
      <div className="flex justify-center flex-col items-center gap-4">
        {/* Шаг 4: Придумайте новый пароль */}
        {step === 1 && (
          <div className="bg-white border rounded-[12px] md:w-[425px] w-[90%] flex flex-col items-center gap-2 p-6">
            <TitleComponent className="!text-[24px] w-full text-center">
              Придумайте новый пароль
            </TitleComponent>
            <form className="w-full flex flex-col gap-4 mt-2">
              <div>
                <Description>
                  Новый пароль{" "}
                  <span className="text-[#E60000] font-[600]">*</span>
                </Description>
                <div className="relative w-full flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Новый пароль"
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
                  Сохранить
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Шаг 5: Вы успешно поменяли пароль */}
        {step === 2 && (
          <div className="bg-white border rounded-[12px] md:w-[425px] w-[90%] flex flex-col items-center gap-2 p-6">
            <TitleComponent className="!text-[24px] w-full text-center">
              Вы успешно поменяли пароль!
            </TitleComponent>
            <div className="flex justify-end w-full mt-2">
              <Button type="button" className="md:!w-[78px] w-full">
                <Link href="user"> Войти</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Forget;
