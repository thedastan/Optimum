"use client";
import { useEffect, useRef, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface CustomSelectProps {
  label: string;
  placeholder: string;
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
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
    onChange(selectedValue);
    setIsOpen(false);
    setSearchQuery("");
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

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase()),
  );


  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full h-[48px] px-4 border-[#E4E4E7] bg-white text-[#000000] rounded-[8px] text-[14px] font-[400] border outline-none transition-all duration-200 text-left flex justify-between items-center ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <span>{value || placeholder}</span>

        <span className="text-[#515151] text-[22px]">
          {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </span>
      </button>

      {isOpen && !disabled && (
        <div className="absolute p-2 z-50 mt-1 w-full bg-white border border-[#E4E4E7] rounded-[8px] shadow-lg max-h-60 overflow-auto">
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

          {filteredOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`w-full flex items-center justify-between rounded-[8px] text-left px-4 py-2 hover:bg-[#FAFAFA] ${
                value === option
                  ? "bg-[#F5F5F5] text-[#000000] font-medium"
                  : "text-[#515151]"
              }`}
            >
              {option}
              {value === option && <IoCheckmark size={23} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
