import { ComponentProps } from "react";
import NextLink from "next/link";
import { twMerge } from "tailwind-merge";
import { Icon, IconName } from "@virtuslab/tetrisly-icons";

interface LinkProps extends ComponentProps<typeof NextLink> {
  variant?: "brand" | "neutral" | "danger" | "success" | "warning";
  icon?: IconName & `20-${string}`;
}

export const Link = ({
  className,
  variant,
  icon,
  children,
  ...props
}: LinkProps) => (
  <NextLink
    className={twMerge(
      " px-4 py-2 rounded",
      "flex items-center gap-2",
      variant === "neutral" && "hover:bg-neutral-200 text-black",
      className
    )}
    {...props}
  >
    {icon && <Icon name={icon} />}
    <span>{children}</span>
  </NextLink>
);
