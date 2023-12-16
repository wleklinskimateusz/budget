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
        "rounded px-4 py-2 focus-visible:ring-offset-4",

        variant === "neutral" &&
          "bg-neutral-200 text-neutral-900 hover:bg-neutral-300 hover:text-neutral-800",
        variant === "neutral" &&
          "dark:bg-neutral-900 hover:dark:bg-neutral-800 dark:text-neutral-200 dark:hover:text-neutral-300",

        variant === "brand" && "bg-brand-500 text-white hover:bg-brand-400",

        variant === "danger" && "bg-red-600 text-white hover:bg-red-500",

        variant === "success" && "bg-green-600 text-white hover:bg-green-500",

        variant === "warning" && "bg-yellow-500 text-white hover:bg-yellow-400",
        className
      )}
      {...rest}
    />
  );
}
