import { LinkProps } from "next/link";

import { IconName } from "@virtuslab/tetrisly-icons";
import { Link } from "./Link";

type NavItemProps = {
  href: LinkProps["href"];
  children: React.ReactNode;
  className?: string;
  icon?: IconName & `20-${string}`;
  active?: boolean;
};

export const NavItem = ({ active, className, ...rest }: NavItemProps) => {
  return (
    <li className={className}>
      <Link className={active ? "text-brand-500" : ""} {...rest} />
    </li>
  );
};
