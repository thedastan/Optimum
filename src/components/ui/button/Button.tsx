// components/ui/Button.tsx
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  // Определяем классы по варианту
  const baseClasses =
    "flex items-center w-full h-[40px] text-[14px] justify-center font-[600] text-white rounded-[8px] transition-all duration-200  ";

  const variantClasses = {
    primary: "bg-[#000000] hover:bg-[#3b3b3b]",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline:
      "border border-[#28AC4D] text-[#28AC4D] hover:bg-[#28AC4D] hover:text-white",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]}   ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
