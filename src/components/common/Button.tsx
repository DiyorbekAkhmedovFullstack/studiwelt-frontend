import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover active:bg-primary disabled:bg-gray-300",
  secondary:
    "bg-surface text-text-main border-2 border-border hover:bg-gray-50 active:bg-gray-100",
  danger:
    "bg-danger text-white hover:bg-[#9A3A3A] active:bg-[#8B3333] disabled:bg-gray-300",
  success:
    "bg-success text-white hover:bg-[#5A7A5D] active:bg-[#4A6A4D] disabled:bg-gray-300",
  ghost: "bg-transparent text-text-main hover:bg-gray-100 active:bg-gray-200",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm min-h-[44px]" /* WCAG 2.2 AA compliant */,
  md: "px-6 py-2.5 text-base min-h-[44px]" /* WCAG 2.2 AA compliant */,
  lg: "px-8 py-3 text-lg min-h-[48px]" /* Extra comfortable */,
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 inline-flex items-center justify-center gap-2";

  const widthStyle = fullWidth ? "w-full" : "";

  const combinedClassName =
    `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`.trim();

  return (
    <button className={combinedClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
