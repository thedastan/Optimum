"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Description } from "@/components/ui/text/Description";
import CustomSelect from "./CustomSelect";
import CustomSelectCheck from "./CustomSelectCheck";
import { useProducts } from "@/redux/hooks/product";
import { Title } from "@/components/ui/text/Title";
import Button from "@/components/ui/button/Button";

interface CatalogProps {
  isDetailPage?: boolean;
  filters: {
    selectedMarka: string | null;
    selectedModel: string | null;
    selectedKuzov: string | null;
    selectedTypes: string[];
  };
  setFilters: {
    setSelectedMarka: (value: string | null) => void;
    setSelectedModel: (value: string | null) => void;
    setSelectedKuzov: (value: string | null) => void;
    setSelectedTypes: (value: string[]) => void;
  };
}

const Catalog: React.FC<CatalogProps> = ({
  isDetailPage = false,
  filters,
  setFilters,
}) => {
  const router = useRouter();
  const { data: products } = useProducts();

  const { selectedMarka, selectedModel, selectedKuzov, selectedTypes } =
    filters;

  const {
    setSelectedMarka,
    setSelectedModel,
    setSelectedKuzov,
    setSelectedTypes,
  } = setFilters;

  // 🔥 Переход ТОЛЬКО если это DetailPage
  useEffect(() => {
    if (!isDetailPage) return;

    const query = new URLSearchParams();

    if (selectedMarka) query.set("marka", selectedMarka);
    if (selectedModel) query.set("model", selectedModel);
    if (selectedKuzov) query.set("kuzov", selectedKuzov);
    if (selectedTypes.length > 0) query.set("types", selectedTypes.join(","));

    if (
      selectedMarka ||
      selectedModel ||
      selectedKuzov ||
      selectedTypes.length > 0
    ) {
      router.push(`/catalog?${query.toString()}`);
    }
  }, [selectedMarka, selectedModel, selectedKuzov, selectedTypes]);

  if (!products) return null;

  // 🔹 Локальная фильтрация для dropdown
  const filteredByMarka = selectedMarka
    ? products.filter((p) => p.brand.brand_name === selectedMarka)
    : products;

  const allBrands = Array.from(
    new Set(products.map((p) => p.brand.brand_name)),
  ).sort();

  const allModels = Array.from(
    new Set(filteredByMarka.map((p) => p.model.model_name)),
  ).sort();

  const filteredByModel = selectedModel
    ? filteredByMarka.filter((p) => p.model.model_name === selectedModel)
    : filteredByMarka;

  const allKuzovs = Array.from(
    new Set(filteredByModel.map((p) => p.body.type_name)),
  ).sort();

  const filteredByKuzov = selectedKuzov
    ? filteredByModel.filter((p) => p.body.type_name === selectedKuzov)
    : filteredByModel;

  const allParts = Array.from(
    new Set(filteredByKuzov.map((p) => p.parts.spare_name)),
  ).sort();

  const handleReset = () => {
    setSelectedMarka(null);
    setSelectedModel(null);
    setSelectedKuzov(null);
    setSelectedTypes([]);
  };

  return (
    <section className="border-b py-4">
      <div className="container">
        <div className="flex flex-col gap-4">
          <Description>Главная / Каталог автозапчастей</Description>

          <Title className="!text-[20px]">Выберите параметры запчасти</Title>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
              <CustomSelect
                label="Марка"
                placeholder="Марка"
                options={allBrands}
                value={selectedMarka}
                onChange={(v) => {
                  setSelectedMarka(v);
                  setSelectedModel(null);
                  setSelectedKuzov(null);
                  setSelectedTypes([]);
                }}
              />

              <CustomSelect
                label="Модель"
                placeholder="Модель"
                options={allModels}
                value={selectedModel}
                onChange={(v) => {
                  setSelectedModel(v);
                  setSelectedKuzov(null);
                  setSelectedTypes([]);
                }}
                disabled={!selectedMarka}
              />

              <CustomSelect
                label="Кузов"
                placeholder="Кузов"
                options={allKuzovs}
                value={selectedKuzov}
                onChange={(v) => {
                  setSelectedKuzov(v);
                  setSelectedTypes([]);
                }}
                disabled={!selectedModel}
              />

              <CustomSelectCheck
                label="Тип"
                placeholder="Тип запчасти"
                options={allParts}
                value={selectedTypes}
                onChange={setSelectedTypes}
                disabled={!selectedKuzov}
              />
            </div>

            <Button
              className="md:w-[100px] w-full h-[45px]"
              onClick={handleReset}
            >
              Сбросить
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
