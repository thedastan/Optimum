import React from "react";
import Basket from "./Basket";
import { Description } from "@/components/ui/text/Description";

const BasketPage = () => {
  return (
    <div>
      <div className="w-full border-b py-4">
        <div className="container">
          <Description className="!text-[#313131]">
            Главная / Корзина
          </Description>
        </div>
      </div>
      <Basket />
    </div>
  );
};

export default BasketPage;
