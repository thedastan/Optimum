"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";

interface Props {
  onSuccess: (code: string) => void;
}

const CodeStep: React.FC<Props> = ({ onSuccess }) => {
  const [code, setCode] = useState("");

  return (
    <div className="bg-white rounded-[12px] p-6 md:w-[420px] w-full">
      <TitleComponent className="text-center !text-[24px]">
        Введите код из email
      </TitleComponent>

      <div className="w-full flex flex-col items-end">
        <div className="w-full mt-6">
          <Description className="font-[600]">
            Код <span className="text-red-600">*</span>
          </Description>

          <input
            className="border p-2 rounded-lg w-full mb-4 outline-none"
            placeholder="Введите код из Email"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <Button
          className="md:!w-[120px] w-full"
          onClick={() => onSuccess(code)}
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
};

export default CodeStep;
