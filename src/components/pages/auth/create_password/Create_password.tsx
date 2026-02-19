"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SuccessStep from "../create_password/SuccessStep";
import CreatePasswordForm from "../create_password/CreatePasswordForm";

// 1. Компонент, который реально использует useSearchParams
const CreatePasswordContent = () => {
  const [step, setStep] = useState(1);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  return (
    <>
      {step === 1 && (
        <CreatePasswordForm token={token} onSuccess={() => setStep(2)} />
      )}
      {step === 2 && <SuccessStep />}
    </>
  );
};

// 2. Основной компонент страницы
const Create_password = () => {
  return (
    <section className="bg-[#F5F5F5] py-10 px-4 h-[90vh] flex justify-center items-center">
      {/* КРИТИЧНО: Suspense должен быть ВНЕ компонента, 
          который вызывает useSearchParams
      */}
      <Suspense fallback={<div>Загрузка формы...</div>}>
        <CreatePasswordContent />
      </Suspense>
    </section>
  );
};

export default Create_password;
