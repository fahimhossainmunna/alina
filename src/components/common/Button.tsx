import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "font-sans font-medium uppercase tracking-wider transition-all duration-300 inline-flex items-center justify-center focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-brand-primary text-[#FFFCF9] shadow-[0_10px_20px_rgba(116,39,9,0.15)] hover:shadow-[0_12px_24px_rgba(116,39,9,0.25)] hover:opacity-95",

    outline:
      "bg-white text-brand-primary shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)] hover:bg-[#FFFCF9]/50 border border-transparent",

    text: "bg-transparent text-brand-primary hover:underline px-0 py-0",
  };

  const sizes = {
    sm: "text-xs px-4 py-2 rounded-lg",
    md: "text-sm px-8 py-3.5 rounded-[12px]",
    lg: "text-base px-10 py-4 rounded-[14px]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
