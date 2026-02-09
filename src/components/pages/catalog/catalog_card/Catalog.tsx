"use client";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import React, { useEffect, useMemo } from "react";
import CustomSelect from "./CustomSelect";
import CustomSelectCheck from "./CustomSelectCheck";
import { useProducts } from "@/redux/hooks/product";

interface CatalogProps {
  filters: {
    selectedMarka: string | null;
    selectedModel: string | null;
    selectedKuzov: string | null;
    selectedTypes: string[];
  };
  setFilters: {
    setSelectedMarka: (v: string | null) => void;
    setSelectedModel: (v: string | null) => void;
    setSelectedKuzov: (v: string | null) => void;
    setSelectedTypes: (v: string[]) => void;
  };
}

const Catalog: React.FC<CatalogProps> = ({ filters, setFilters }) => {
  const { data: products } = useProducts();
  const { selectedMarka, selectedModel, selectedKuzov, selectedTypes } =
    filters;
  const {
    setSelectedMarka,
    setSelectedModel,
    setSelectedKuzov,
    setSelectedTypes,
  } = setFilters;

  // 1. Уникальные марки
  const availableBrands = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map((p) => p.brand.brand_name))).sort();
  }, [products]);

  // 2. Уникальные модели для марки
  const availableModels = useMemo(() => {
    if (!selectedMarka || !products) return [];
    return Array.from(
      new Set(
        products
          .filter((p) => p.brand.brand_name === selectedMarka)
          .map((p) => p.model.model_name),
      ),
    ).sort();
  }, [selectedMarka, products]);

  // 3. Уникальные кузовы для модели
  const availableKuzovs = useMemo(() => {
    if (!selectedModel || !products) return [];
    return Array.from(
      new Set(
        products
          .filter(
            (p) =>
              p.brand.brand_name === selectedMarka &&
              p.model.model_name === selectedModel,
          )
          .map((p) => p.body.type_name),
      ),
    ).sort();
  }, [selectedMarka, selectedModel, products]);

  // 4. Уникальные типы запчастей для кузова
  const availableParts = useMemo(() => {
    if (!selectedKuzov || !products) return [];
    return Array.from(
      new Set(
        products
          .filter(
            (p) =>
              p.brand.brand_name === selectedMarka &&
              p.model.model_name === selectedModel &&
              p.body.type_name === selectedKuzov,
          )
          .map((p) => p.parts.spare_name),
      ),
    ).sort();
  }, [selectedKuzov, selectedMarka, selectedModel, products]);

  // Сброс зависимых полей при изменении родительских
  useEffect(() => {
    setSelectedModel(null);
    setSelectedKuzov(null);
    setSelectedTypes([]);
  }, [selectedMarka]);
  useEffect(() => {
    setSelectedKuzov(null);
    setSelectedTypes([]);
  }, [selectedModel]);
  useEffect(() => {
    setSelectedTypes([]);
  }, [selectedKuzov]);

  return (
    <section className="border-b py-4">
      <div className="container">
        <div className="w-full flex flex-col gap-[16px]">
          <Description className="!text-[#292A2C]">
            Главная / Каталог автозапчастей
          </Description>
          <Title className="!text-[20px] !font-[100]">
            Выберите параметры запчасти
          </Title>
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3">
            <CustomSelect
              label="Марка"
              placeholder="Марка"
              options={availableBrands}
              value={selectedMarka}
              onChange={setSelectedMarka}
            />
            <CustomSelect
              label="Модель"
              placeholder="Модель"
              options={availableModels}
              value={selectedModel}
              onChange={setSelectedModel}
              disabled={!selectedMarka}
            />
            <CustomSelect
              label="Кузов"
              placeholder="Кузов"
              options={availableKuzovs}
              value={selectedKuzov}
              onChange={setSelectedKuzov}
              disabled={!selectedModel}
            />
            <CustomSelectCheck
              label="Тип"
              placeholder="Тип запчасти"
              options={availableParts}
              value={selectedTypes}
              onChange={setSelectedTypes}
              disabled={!selectedKuzov}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
