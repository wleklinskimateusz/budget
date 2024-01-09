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

export const Nav = ({ className }: NavProps) => {
  return (
    <NavigationMenu
      orientation="vertical"
      className={twMerge("items-start", className)}
    >
      <NavigationMenuList className="w-48  flex-col">
        <NavItem href="/" icon="20-view-dashboard">
          Dashboard
        </NavItem>
        <NavItem href="/budget" icon="20-wallet">
          Budget
        </NavItem>
        <NavItem href="/portfolio" icon="20-wallet">
          Portfolio
        </NavItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

type NavItemProps = {
  href: string;
  icon: IconName;
  children: ReactNode;
};

const NavItem = ({ href, children, icon }: NavItemProps) => (
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
