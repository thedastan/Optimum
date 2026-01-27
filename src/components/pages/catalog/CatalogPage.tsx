import React from "react";
import Catalog from "./catalog_card/Catalog";
import Card from "../home/card/Card";
import Catalog_card from "./catalog_card/Catalog_card";

const CatalogPage = () => {
  return (
    <div>
      <Catalog />
      <Catalog_card />
    </div>
  );
};

export default CatalogPage;
