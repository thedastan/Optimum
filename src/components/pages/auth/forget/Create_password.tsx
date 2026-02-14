import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Create_password = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white border rounded-[12px] md:w-[425px] w-[90%] flex flex-col items-center gap-2 p-6">
      <TitleComponent className="!text-[24px] w-full text-center">
        Придумайте новый пароль
      </TitleComponent>
      <form className="w-full flex flex-col gap-4 mt-2">
        <div>
          <Description>
            Новый пароль <span className="text-[#E60000] font-[600]">*</span>
          </Description>
          <div className="relative w-full flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Новый пароль"
              className="border p-2 flex rounded-[8px] outline-none w-full h-[40px] pr-10"
            />
            <button
              type="button"
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
          <Button type="button" className="md:!w-[178px] w-full">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Create_password;
