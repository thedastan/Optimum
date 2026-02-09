"use client";
import React, { useState } from "react";
import Catalog from "./catalog_card/Catalog";
import Catalog_card from "./catalog_card/Catalog_card";

const CatalogPage = () => {
  // Состояния для фильтрации
  const [selectedMarka, setSelectedMarka] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedKuzov, setSelectedKuzov] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  return (
    <div>
      <Catalog
        filters={{ selectedMarka, selectedModel, selectedKuzov, selectedTypes }}
        setFilters={{
          setSelectedMarka,
          setSelectedModel,
          setSelectedKuzov,
          setSelectedTypes,
        }}
      />
      <Catalog_card
        filters={{ selectedMarka, selectedModel, selectedKuzov, selectedTypes }}
      />
    </div>
  );
};

export default CatalogPage;
