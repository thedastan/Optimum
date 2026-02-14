import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useForgotPassword } from "@/redux/hooks/auth";
import React, { useState } from "react";

const Password_recovery = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const { mutate, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(email, {
      onSuccess: () => {
        alert("Письмо отправлено на почту");
        setEmail("");
      },
      onError: () => {
        alert("Ошибка отправки");
      },
    });
  };

  return (
    <div className="bg-white border rounded-[12px] md:w-[425px] w-[90%] flex flex-col items-center gap-2 p-6">
      <TitleComponent className="!text-[24px] w-full text-center">
        Восстановление пароля
      </TitleComponent>
      <Description>Введите почту для восстановления пароля</Description>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-2">
        <div>
          <Description>
            Email
            <span className="text-[#E60000] font-[600]">*</span>
          </Description>
          <div className="relative w-full flex items-center">
            <input
              type="email"
              placeholder="Введите вашу почту"
              className="border p-2 flex rounded-[8px] outline-none w-full h-[40px] pr-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end w-full mt-2">
          <Button
            type="submit"
            disabled={isPending}
            className="md:!w-[178px] w-full"
          >
            Отправить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Password_recovery;
