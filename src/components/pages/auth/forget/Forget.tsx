"use client";

import React, { useState } from "react";
import PasswordRecovery from "./Password_recovery";
// import CodeStep from "./CodeStep";
import CreatePassword from "./Create_password";
import CodeStep from "./CodeStep";
import SuccessStep from "./SuccessStep";
// import SuccessStep from "./SuccessStep";

const Forget = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  return (
    <section className="bg-[#F5F5F5] py-10 px-4 h-[90vh] flex justify-center items-center">
      {step === 1 && (
        <PasswordRecovery
          onSuccess={(emailValue) => {
            setEmail(emailValue);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <CodeStep
          onSuccess={(codeValue) => {
            setCode(codeValue);
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <CreatePassword
          email={email}
          resetCode={code}
          onSuccess={() => setStep(4)}
        />
      )}

      {step === 4 && <SuccessStep />}
    </section>
  );
};

export default Forget;
