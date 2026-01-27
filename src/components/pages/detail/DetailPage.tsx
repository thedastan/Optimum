import React from "react";
import Detail from "./detail/Detail";
import Catalog from "../catalog/catalog_card/Catalog";
import Catalog_card from "../catalog/catalog_card/Catalog_card";

const DetailPage = () => {
  return (
    <div>
      <Catalog />
      <Detail />
      <Catalog_card />
    </div>
  );
};

export default DetailPage;
