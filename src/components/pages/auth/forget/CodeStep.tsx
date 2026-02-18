"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";
import Link from "next/link";

interface Props {
  onSuccess: (code: string) => void;
}

const CodeStep: React.FC<Props> = ({ onSuccess }) => {
  const [code, setCode] = useState("");

  return (
    <div className="bg-white rounded-[12px] p-4 md:w-[420px] w-full">
      <TitleComponent className="text-center !text-[24px]">
        Проверьте почту
      </TitleComponent>
      <Description className="mt-4">
        Мы отправили ссылку для восстановления пароля
      </Description>

      <div className="w-full flex justify-end mt-6">
        <Button className="md:!w-[180px] w-full">
          <Link
            className="w-full h-full flex items-center justify-center"
            href="/"
          >
            Вернуться на главную
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CodeStep;
