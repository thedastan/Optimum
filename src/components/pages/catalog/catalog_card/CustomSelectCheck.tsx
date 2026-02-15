"use client";
import { useEffect, useRef, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

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

  // поиск
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <span>{getButtonText()}</span>
        <span className="text-[#515151] text-[22px]">
          {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </span>
      </button>

      {isOpen && !disabled && (
        <div className="absolute max-w-[625px] p-3 z-30 mt-[50px] w-full bg-white border border-[#E4E4E7] rounded-[8px] shadow-lg overflow-hidden">
          <div className="w-full flex border rounded-[8px] justify-end relative">
            <button className="w-[40px] h-[40px] p-[10px] rounded-[8px]">
              <LuSearch className="text-[18px]" />
            </button>

            <input
              className="w-full h-[40px] p-[10px] rounded-[8px] outline-none"
              type="text"
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 p-2">
            {filteredOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className="w-full flex items-center rounded-[8px] text-left px-3 py-2 hover:bg-[#FAFAFA]"
              >
                <div
                  className={`w-5 h-5 rounded-[3px] border flex items-center justify-center mr-2 ${
                    value.includes(option)
                      ? "border-[#E60000] bg-[#E60000]"
                      : "border-[#515151]"
                  }`}
                >
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
