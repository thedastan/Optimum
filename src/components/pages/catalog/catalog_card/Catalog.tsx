"use client";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import React, { useState, useRef, useEffect } from "react";
import CustomSelect from "./CustomSelect";
import CustomSelectCheck from "./CustomSelectCheck";

const date = [
	{
		markas: [
			{
				marka: "Toyota",
				models: [
					{
						model: "Camry",
						kuzovs: [
							{ kuzov: "XV70 (2017-2023)" },
							{ kuzov: "XV50 (2011-2017)" },
							{ kuzov: "XV40 (2006-2011)" },
						],
					},
					{
						model: "Corolla",
						kuzovs: [
							{ kuzov: "E210 (2018-н.в.)" },
							{ kuzov: "E170/E180 (2013-2018)" },
							{ kuzov: "E160 (2012-2018)" },
						],
					},
					{
						model: "RAV4",
						kuzovs: [
							{ kuzov: "XA50 (2018-н.в.)" },
							{ kuzov: "XA40 (2012-2018)" },
							{ kuzov: "XA30 (2005-2012)" },
						],
					},
					{
						model: "CH-R",
						kuzovs: [
							{ kuzov: "AX10 (2016-2023)" },
							{ kuzov: "AX20 (2023-н.в.)" },
						],
					},
					{
						model: "Land Cruiser",
						kuzovs: [
							{ kuzov: "J200 (2007-2021)" },
							{ kuzov: "J300 (2021-н.в.)" },
							{ kuzov: "Prado J150 (2009-2023)" },
						],
					},
				],
			},
			{
				marka: "Hyundai",
				models: [
					{
						model: "Solaris",
						kuzovs: [{ kuzov: "RB (2017-2023)" }, { kuzov: "RB (2010-2017)" }],
					},
					{
						model: "Tucson",
						kuzovs: [
							{ kuzov: "NX4 (2020-н.в.)" },
							{ kuzov: "TL (2015-2020)" },
							{ kuzov: "LM (2010-2015)" },
						],
					},
					{
						model: "Santa Fe",
						kuzovs: [
							{ kuzov: "TM (2020-н.в.)" },
							{ kuzov: "DM (2018-2020)" },
							{ kuzov: "SM (2012-2018)" },
						],
					},
					{
						model: "Sonata",
						kuzovs: [
							{ kuzov: "DN8 (2019-н.в.)" },
							{ kuzov: "LF (2014-2019)" },
							{ kuzov: "YF (2009-2014)" },
						],
					},
					{
						model: "Elantra",
						kuzovs: [
							{ kuzov: "CN7 (2020-н.в.)" },
							{ kuzov: "AD (2016-2020)" },
							{ kuzov: "MD (2010-2016)" },
						],
					},
				],
			},
			{
				marka: "Lexus",
				models: [
					{
						model: "RX",
						kuzovs: [
							{ kuzov: "AL20 (2022-н.в.)" },
							{ kuzov: "AL10 (2015-2022)" },
							{ kuzov: "AL30 (2008-2015)" },
						],
					},
					{
						model: "ES",
						kuzovs: [
							{ kuzov: "XV70 (2018-н.в.)" },
							{ kuzov: "XV60 (2012-2018)" },
							{ kuzov: "XV50 (2006-2012)" },
						],
					},
					{
						model: "NX",
						kuzovs: [
							{ kuzov: "AZ20 (2021-н.в.)" },
							{ kuzov: "AZ10 (2014-2021)" },
						],
					},
					{
						model: "GX",
						kuzovs: [
							{ kuzov: "J150 (2009-2023)" },
							{ kuzov: "J160 (2023-н.в.)" },
						],
					},
				],
			},
			{
				marka: "Honda",
				models: [
					{
						model: "Accord",
						kuzovs: [
							{ kuzov: "CB/CT (2023-н.в.)" },
							{ kuzov: "CP/CT (2017-2023)" },
							{ kuzov: "CR (2012-2017)" },
						],
					},
					{
						model: "CR-V",
						kuzovs: [
							{ kuzov: "RK5/RK6 (2022-н.в.)" },
							{ kuzov: "RW/RX (2016-2022)" },
							{ kuzov: "RM/RE (2011-2016)" },
						],
					},
					{
						model: "Civic",
						kuzovs: [
							{ kuzov: "FL/FE/FK (2021-н.в.)" },
							{ kuzov: "FC/FK (2015-2021)" },
							{ kuzov: "FB/FG (2011-2016)" },
						],
					},
					{
						model: "Pilot",
						kuzovs: [
							{ kuzov: "3rd gen (2016-2022)" },
							{ kuzov: "4th gen (2023-н.в.)" },
						],
					},
				],
			},
			{
				marka: "Mercedes",
				models: [
					{
						model: "E-Class",
						kuzovs: [
							{ kuzov: "W213 (2016-2023)" },
							{ kuzov: "W214 (2023-н.в.)" },
							{ kuzov: "W212 (2009-2016)" },
						],
					},
					{
						model: "C-Class",
						kuzovs: [
							{ kuzov: "W206 (2021-н.в.)" },
							{ kuzov: "W205 (2014-2021)" },
							{ kuzov: "W204 (2007-2014)" },
						],
					},
					{
						model: "GLC",
						kuzovs: [
							{ kuzov: "X254 (2022-н.в.)" },
							{ kuzov: "X253 (2015-2022)" },
						],
					},
					{
						model: "GLE",
						kuzovs: [
							{ kuzov: "W167 (2018-н.в.)" },
							{ kuzov: "W166 (2015-2018)" },
						],
					},
					{
						model: "S-Class",
						kuzovs: [
							{ kuzov: "W223 (2020-н.в.)" },
							{ kuzov: "W222 (2013-2020)" },
						],
					},
				],
			},
			{
				marka: "BMW",
				models: [
					{
						model: "3 Series",
						kuzovs: [
							{ kuzov: "G20/G21 (2019-н.в.)" },
							{ kuzov: "F30/F31/F34 (2012-2019)" },
							{ kuzov: "E90/E91/E92/E93 (2005-2012)" },
						],
					},
					{
						model: "5 Series",
						kuzovs: [
							{ kuzov: "G30/G31 (2017-2023)" },
							{ kuzov: "G60/G61 (2023-н.в.)" },
							{ kuzov: "F10/F11 (2010-2017)" },
						],
					},
					{
						model: "X5",
						kuzovs: [
							{ kuzov: "G05 (2018-н.в.)" },
							{ kuzov: "F15 (2013-2018)" },
							{ kuzov: "E70 (2006-2013)" },
						],
					},
					{
						model: "X3",
						kuzovs: [
							{ kuzov: "G01 (2017-н.в.)" },
							{ kuzov: "F25 (2010-2017)" },
							{ kuzov: "E83 (2003-2010)" },
						],
					},
					{
						model: "7 Series",
						kuzovs: [
							{ kuzov: "G70 (2022-н.в.)" },
							{ kuzov: "G11/G12 (2015-2022)" },
						],
					},
				],
			},
			{
				marka: "KIA",
				models: [
					{
						model: "Rio",
						kuzovs: [
							{ kuzov: "UB (2017-2023)" },
							{ kuzov: "UB (2011-2017)" },
							{ kuzov: "JB (2005-2011)" },
						],
					},
					{
						model: "Sportage",
						kuzovs: [
							{ kuzov: "NQ5 (2021-н.в.)" },
							{ kuzov: "QL (2015-2021)" },
							{ kuzov: "SL (2010-2015)" },
						],
					},
					{
						model: "Sorento",
						kuzovs: [
							{ kuzov: "MQ4 (2020-н.в.)" },
							{ kuzov: "XM (2014-2020)" },
							{ kuzov: "UM (2009-2014)" },
						],
					},
					{
						model: "Cerato",
						kuzovs: [
							{ kuzov: "BD (2018-н.в.)" },
							{ kuzov: "YD (2013-2018)" },
							{ kuzov: "TD (2008-2013)" },
						],
					},
					{
						model: "Optima",
						kuzovs: [{ kuzov: "JF (2015-2020)" }, { kuzov: "TF (2010-2015)" }],
					},
				],
			},
		],
	},
];

const Catalog = () => {
	const [selectedMarka, setSelectedMarka] = useState<string | null>(null);
	const [selectedModel, setSelectedModel] = useState<string | null>(null);
	const [selectedKuzov, setSelectedKuzov] = useState<string | null>(null);
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

	// Получение доступных моделей на основе выбранной марки
	const availableModels = React.useMemo(() => {
		if (!selectedMarka) return [];
		const marka = date[0].markas.find((m) => m.marka === selectedMarka);
		return marka ? marka.models.map((m) => m.model) : [];
	}, [selectedMarka]);

	// Получение доступных кузовов на основе выбранной марки и модели
	const availableKuzovs = React.useMemo(() => {
		if (!selectedMarka || !selectedModel) return [];
		const marka = date[0].markas.find((m) => m.marka === selectedMarka);
		const model = marka?.models.find((m) => m.model === selectedModel);
		return model ? model.kuzovs.map((k) => k.kuzov) : [];
	}, [selectedMarka, selectedModel]);

	// Сброс зависимых полей при изменении родительского
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
		<section className="">
			<div className="">
				<div className="border-b py-4">
					<div className="container">
						<div className="w-full flex flex-col gap-[16px]">
							<Description className="!text-[#292A2C]">
								Главная / Каталог автозапчастей
							</Description>
							<Title className="!text-[20px] !font-[100]">
								Выберите марку машины, модель, кузов и тип запчасти
							</Title>
							<div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
								{/* Марка */}
								<CustomSelect
									label="Марка *"
									placeholder="Выберите марку"
									options={date[0].markas.map((m) => m.marka)}
									value={selectedMarka}
									onChange={setSelectedMarka}
								/>

								{/* Модель */}
								<CustomSelect
									label="Модель *"
									placeholder="Выберите модель"
									options={availableModels}
									value={selectedModel}
									onChange={setSelectedModel}
									disabled={!selectedMarka}
								/>

								{/* Кузов */}
								<CustomSelect
									label="Кузов *"
									placeholder="Выберите кузов"
									options={availableKuzovs}
									value={selectedKuzov}
									onChange={setSelectedKuzov}
									disabled={!selectedModel}
								/>

								{/* Тип запчасти - с чекбоксами */}
								<CustomSelectCheck
									label="Тип запчасти *"
									placeholder="Выберите тип"
									options={[
										"Капоты",
										"Капоты",
										"Капоты",

										"Бамперы",
										"Бамперы",
										"Бамперы",

										"Двери",
										"Двери",
										"Двери",

										"Крылья",
										"Крылья",
										"Крылья",

										"Фары",
										"Фары",
										"Фары",

										"Фонари",
										"Фонари",
										"Фонари",

										"Зеркала",
										"Зеркала",
										"Зеркала",

										"Стекла",
										"Стекла",
										"Стекла",

										"Двигатели",
										"Двигатели",
										"Двигатели",

										"Коробки передач",
										"Коробки передач",
										"Коробки передач",


										 
									]}
									value={selectedTypes}
									onChange={setSelectedTypes}
									disabled={!selectedKuzov}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Catalog;