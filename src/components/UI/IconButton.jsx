import React from "react";

const IconButton = ({
  icon: Icon,
  testo,
  testoAriaLabel,
  onClick,
  type = "button",
  variant = "secondary",
  className = "",
  size = "md", // nuovo prop per gestire sm/md
}) => {
  // dimensioni coerenti con la SearchBar
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
  };

  const baseClasses = `flex items-center justify-center gap-2 rounded-md font-medium transition-shadow duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap ${sizeClasses[size]}`;

  const variantClasses = {
    primary:
      "bg-[#d7a641] text-[#1e1606] hover:bg-[#c29238] focus:ring-[#d7a641]",
    secondary:
      "bg-[#8fe7c6] text-[#1e1606] hover:bg-[#7cd3b4] focus:ring-[#8fe7c6]",
    accent:
      "bg-[#b8fd42] text-[#1e1606] hover:bg-[#a0e63a] focus:ring-[#b8fd42]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={testoAriaLabel || (!testo ? "Icon button" : undefined)}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {Icon && (
        <Icon
          className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
          aria-hidden="true"
        />
      )}
      <span className={`${Icon ? "" : "mx-auto"}`}>{testo}</span>
    </button>
  );
};

export default IconButton;
