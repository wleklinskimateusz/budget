"use client";

import { twMerge } from "tailwind-merge";
import { ComponentProps, ReactNode } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import { Icon, IconName } from "@virtuslab/tetrisly-icons";

type NavProps = {
  className?: string;
};

const links = [
  { href: "/", icon: "20-view-dashboard", children: "Dashboard" },
  { href: "/portfolio", icon: "20-wallet", children: "Portfolio" },
] as const satisfies readonly ComponentProps<typeof NavItem>[];

export const Nav = ({ className }: NavProps) => {
  return (
    <NavigationMenu
      orientation="vertical"
      className={twMerge(" items-start", className)}
    >
      <NavigationMenuList className="w-36  flex-col">
        {links.map((link) => (
          <NavItem key={link.href} {...link} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const NavItem = ({
  href,
  children,
  icon,
}: {
  href: string;
  children: ReactNode;
  icon: IconName;
}) => (
  <NavigationMenuItem className="w-full flex-grow">
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={twMerge(
          navigationMenuTriggerStyle(),
          "flex w-full items-center justify-between",
        )}
      >
        {children}
        <Icon name={icon} />
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);
