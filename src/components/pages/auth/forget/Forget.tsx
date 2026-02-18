"use client";

import React, { useState } from "react";
import CodeStep from "./CodeStep";
import PasswordRecovery from "./Password_recovery";

const Forget = () => {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");

  return (
    <section className="bg-[#F5F5F5] py-10 px-4 h-[90vh] flex justify-center items-center">
      {step === "email" && (
        <PasswordRecovery
          onSuccess={(email) => {
            setEmail(email);
            setStep("code");
          }}
        />
      )}

      {step === "code" && <CodeStep onSuccess={() => {}} />}
    </section>
  );
};

export default Forget;
