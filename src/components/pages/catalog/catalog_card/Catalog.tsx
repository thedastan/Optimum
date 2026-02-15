"use client";
import { Description } from "@/components/ui/text/Description";
import CustomSelect from "./CustomSelect";
import CustomSelectCheck from "./CustomSelectCheck";
import { useProducts } from "@/redux/hooks/product";
import { Title } from "@/components/ui/text/Title";

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

  // Уникальные и отсортированные опции
  const allBrands = Array.from(
    new Set(products?.map((p) => p.brand.brand_name)),
  ).sort();
  const allModels = Array.from(
    new Set(products?.map((p) => p.model.model_name)),
  ).sort();
  const allKuzovs = Array.from(
    new Set(products?.map((p) => p.body.type_name)),
  ).sort();
  const allParts = Array.from(
    new Set(products?.map((p) => p.parts.spare_name)),
  ).sort();

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
              options={allBrands}
              value={selectedMarka}
              onChange={setSelectedMarka}
            />
            <CustomSelect
              label="Модель"
              placeholder="Модель"
              options={allModels}
              value={selectedModel}
              onChange={setSelectedModel}
            />
            <CustomSelect
              label="Кузов"
              placeholder="Кузов"
              options={allKuzovs}
              value={selectedKuzov}
              onChange={setSelectedKuzov}
            />
            <CustomSelectCheck
              label="Тип"
              placeholder="Тип запчасти"
              options={allParts}
              value={selectedTypes}
              onChange={setSelectedTypes}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
