"use client";
import { useEffect, useRef, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";

interface CustomSelectCheckProps {
	label: string;
	placeholder: string;
	options: string[];
	value: string[];
	onChange: (value: string[]) => void;
	disabled?: boolean;
}

const CustomSelectCheck: React.FC<CustomSelectCheckProps> = ({
	label,
	placeholder,
	options,
	value,
	onChange,
	disabled = false,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleSelect = (selectedValue: string) => {
		if (value.includes(selectedValue)) {
			onChange(value.filter((item) => item !== selectedValue));
		} else {
			onChange([...value, selectedValue]);
		}
	};

	// Закрытие при клике вне
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
				setSearchQuery("");
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	// Фильтрация опций по поисковому запросу
	const filteredOptions = options.filter((option) =>
		option.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Разбиваем опции на 3 колонки
	const chunkArray = (arr: string[], size: number) => {
		const result = [];
		for (let i = 0; i < arr.length; i += size) {
			result.push(arr.slice(i, i + size));
		}
		return result;
	};

	const columns = chunkArray(
		filteredOptions,
		Math.ceil(filteredOptions.length / 3)
	);

	// Формируем текст для кнопки
	const getButtonText = () => {
		if (value.length === 0) return placeholder;
		return `Выбрано ${value.length}`;
	};

	return (
		<div className="flex flex-col items-end" ref={dropdownRef}>
			<button
				type="button"
				onClick={() => !disabled && setIsOpen(!isOpen)}
				disabled={disabled}
				className={`w-full h-[48px] px-4 border-[#E4E4E7] bg-white text-[#000000] rounded-[8px] text-[14px] font-[400] border outline-none transition-all duration-200 text-left flex justify-between items-center ${
					disabled
						? "opacity-50 cursor-not-allowed"
						: "cursor-pointer hover:border-[#515151]"
				}`}>
				<span>{getButtonText()}</span>
				<span className="text-[#515151]">
					<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
						<path d="M7.5 11L4 7.5l-1 1L7.5 13 12 8.5l-1-1L7.5 11z" />
					</svg>
				</span>
			</button>

			{isOpen && !disabled && (
				<div
					className="absolute max-w-[625px] p-3 z-30 mt-[50px] w-full bg-white border border-[#E4E4E7] rounded-[8px] shadow-lg overflow-hidden "
					style={{ maxHeight: "400px" }}>
					{/* Поисковая строка */}
					<div className="w-full flex   border rounded-[8px] justify-end relative">
						<button className="w-[40px] h-[40px] p-[10px]   rounded-[8px]">
							<LuSearch className="text-[18px]" />
						</button>
						<input
							className="w-full h-[40px] p-[10px] rounded-[8px] outline-none"
							type="text"
							placeholder="Поиск"
						/>
					</div>

					{/* Три колонки с чекбоксами */}
					<div className="grid grid-cols-3  p-2">
						 
						{options.map((option) => (
							<button
								key={option}
								type="button"
								onClick={() => handleSelect(option)}
								className={`w-full flex items-center   rounded-[8px] text-left px-3 py-2 hover:bg-[#FAFAFA]  `}>
								<div
									className={`w-5 h-5 rounded-[3px] border flex items-center justify-center mr-2 ${
										value.includes(option)
											? "border-[#E60000] bg-[#E60000]"
											: "border-[#515151]"
									}`}>
									{value.includes(option) && (
										<IoCheckmark className="text-white text-[12px]" />
									)}
								</div>
								{option}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CustomSelectCheck;
