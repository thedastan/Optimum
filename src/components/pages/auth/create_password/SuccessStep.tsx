"use client";

import Button from "@/components/ui/button/Button";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import Link from "next/link";

const SuccessStep = () => {
  return (
    <div className="bg-white rounded-[12px] p-6 md:w-[420px] w-full">
      <TitleComponent className="text-center !text-[24px]">
        Пароль успешно изменён
      </TitleComponent>

      <div className="mt-6">
        <Button className="w-full">
          <Link
            href="/login"
            className="w-full flex justify-center items-center"
          >
            Войти
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SuccessStep;
