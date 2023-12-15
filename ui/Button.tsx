import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "brand" | "neutral" | "danger" | "success" | "warning";
}
export function Button({
  variant = "neutral",
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "rounded px-4 py-2",
        variant === "neutral" &&
          "bg-primary text-primary hover:bg-primary-hover hover:text-primary-hover",
        variant === "brand" && "bg-brand-50",
        className
      )}
      {...rest}
    />
  );
}
