import Link, { LinkProps } from "next/link";
import { twMerge } from "tailwind-merge";
import { Icon, IconName } from "@virtuslab/tetrisly-icons";

type NavItemProps = {
  href: LinkProps["href"];
  children: React.ReactNode;
  className?: string;
  icon?: IconName & `20-${string}`;
  active?: boolean;
};

export const NavItem = ({
  href,
  children,
  active,
  className,
  icon,
}: NavItemProps) => {
  return (
    <li className={className}>
      <Link
        href={href}
        className={twMerge(
          "hover:bg-neutral-200 px-4 py-2 rounded",
          active && "text-brand-500",
          "flex items-center gap-2"
        )}
      >
        {icon && <Icon name={icon} />}
        <span>{children}</span>
      </Link>
    </li>
  );
};
