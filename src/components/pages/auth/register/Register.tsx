"use client";

import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useLogin, useRegister } from "@/redux/hooks/auth";
import { useRouter } from "next/navigation";

import { toast } from "alert-go";
import "alert-go/dist/notifier.css";

// Если твой Button проксирует type корректно, можно использовать его
import Button from "@/components/ui/button/Button";

const Register = () => {
  const router = useRouter();
  const { mutate, isPending } = useRegister();
  const { mutateAsync: login } = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Останавливаем стандартное поведение кнопки

    // Проверка обязательных полей
    if (!firstName || !email || !phoneNumber || !password || !confirmPassword) {
      toast.error("Заполните обязательные поля", { position: "top-center" });
      return;
    }

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      toast.error("Пароли не совпадают", { position: "top-center" });
      return;
    }

    mutate(
      {
        first_name: firstName,
        email,
        phone_number: phoneNumber,
        password,
      },
      {
        // ... внутри handleRegister ...
        onSuccess: async () => {
          try {
            const data = await login({ email, password });

            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);

            window.dispatchEvent(new Event("auth-changed"));

            toast.success("Регистрация прошла успешно!", {
              position: "top-center",
            });

            router.push("/auth/user");
          } catch (err: any) {
            toast.error(
              err?.response?.data?.detail ||
                "Ошибка авто-входа после регистрации",
              { position: "top-center" },
            );
          }
        },

        onError: (err: any) => {
          const message =
            err?.response?.data?.detail ||
            "Ошибка регистрации. Возможно, пользователь уже существует";

          toast.error(message, { position: "top-center" });
        },
      },
    );
  };

  return (
    <section className="bg-[#F5F5F5] py-10 flex justify-center">
      <div className="flex flex-col items-center gap-4 w-full max-w-[425px]">
        <div className="bg-white border rounded-[12px] w-full flex flex-col gap-2 p-6">
          <TitleComponent className="!text-[24px] w-full text-center">
            Регистрация
          </TitleComponent>

          <Description className="w-full text-center">
            Заполните данные и нажмите кнопку регистрации
          </Description>

          <form className="flex flex-col gap-4 mt-4">
            {/* ФИО */}
            <div>
              <Description>
                ФИО <span className="text-[#E60000] font-[600]">*</span>
              </Description>
              <input
                placeholder="Имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border p-2 rounded-[8px] h-[40px] w-full outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <Description>
                Email <span className="text-[#E60000] font-[600]">*</span>
              </Description>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded-[8px] h-[40px] w-full outline-none"
              />
            </div>

            {/* Телефон */}
            <div>
              <Description>
                Номер телефона{" "}
                <span className="text-[#E60000] font-[600]">*</span>
              </Description>
              <input
                placeholder="Телефон"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border p-2 rounded-[8px] h-[40px] w-full outline-none"
              />
            </div>

            {/* Пароль */}
            <div>
              <Description>
                Пароль <span className="text-[#E60000] font-[600]">*</span>
              </Description>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 rounded-[8px] h-[40px] w-full pr-10 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <AiFillEye size={20} />
                  ) : (
                    <AiFillEyeInvisible size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Подтверждение пароля */}
            <div>
              <Description>
                Подтверждение пароля{" "}
                <span className="text-[#E60000] font-[600]">*</span>
              </Description>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Повторите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border p-2 rounded-[8px] h-[40px] w-full outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <AiFillEye size={20} />
                  ) : (
                    <AiFillEyeInvisible size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Кнопка регистрации */}
            <Button
              type="button"
              onClick={handleRegister}
              disabled={isPending}
              className="bg-black text-white p-2 rounded"
            >
              {isPending ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
