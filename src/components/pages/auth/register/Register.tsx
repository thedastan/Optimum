"use client";

import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";
import Button from "@/components/ui/button/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useRegister } from "@/redux/hooks/auth";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const { mutate, isPending } = useRegister();
  console.log(mutate);

  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!firstName || !email || !phoneNumber || !password || !confirmPassword) {
      alert("Заполните обязательные поля");
      return;
    }

    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
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
        onSuccess: (data) => {
          // сохраняем JWT токены
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);

          router.push("/user"); // или /auth/login
        },
        onError: (err) => {
          console.error(err);
          alert("Ошибка регистрации");
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
            {/* пароль */}

            <div>
              <Description>
                ФИО
                <span className="text-[#E60000] font-[600]">*</span>
              </Description>
              <div className="relative w-full flex items-center">
                <input
                  placeholder="Имя"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border p-2 rounded-[8px] h-[40px] w-full outline-none"
                />
              </div>
            </div>

            <div>
              <Description>
                Email
                <span className="text-[#E60000] font-[600]">*</span>
              </Description>
              <div className="relative w-full flex items-center">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 rounded-[8px] h-[40px] w-full outline-none"
                />
              </div>
            </div>

            <div>
              <Description>
                Номер телефона
                <span className="text-[#E60000] font-[600]">*</span>
              </Description>
              <div className="relative w-full flex items-center">
                <input
                  placeholder="Телефон"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border p-2 rounded-[8px] h-[40px] w-full outline-none"
                />
              </div>
            </div>

            <div>
              <Description>
                пароль
                <span className="text-[#E60000] font-[600]">*</span>
              </Description>
              <div className="relative w-full flex items-center">
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

            <div>
              <Description>
                Подтверждение пароля{" "}
                <span className="text-[#E60000] font-[600]">*</span>
              </Description>
              <div className="relative w-full flex items-center">
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

            <Button type="button" onClick={handleRegister} disabled={isPending}>
              {isPending ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
