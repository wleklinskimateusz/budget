"use client";

import { twMerge } from "tailwind-merge";
import { NavItem } from "./ui/NavItem";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import Link from "next/link";
import { Icon } from "@virtuslab/tetrisly-icons";

type NavProps = {
  className?: string;
};

const links = [
  { href: "/", icon: "20-view-dashboard", children: "Dashboard" },
  { href: "/categories", icon: "20-card", children: "Categories" },
] as const satisfies readonly ComponentProps<typeof NavItem>[];

export const Nav = ({ className }: NavProps) => {
  const active = useActive();
  return (
    <NavigationMenu
      orientation="vertical"
      className={twMerge("shadow items-start", className)}
    >
      <NavigationMenuList className="flex flex-col">
        {links.map((link) => (
          <NavigationMenuItem key={link.href}>
            <Link href={link.href} passHref legacyBehavior>
              <NavigationMenuLink
                active={active === link.href}
                className={twMerge(navigationMenuTriggerStyle(), "flex gap-2")}
              >
                <Icon name={link.icon} />
                {link.children}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const useActive = () => {
  const pathname = usePathname();
  return findActive(pathname);
};

function findActive(pathname: string) {
  if (pathname === "/") return "/";
  return links
    .filter((link) => link.href !== "/")
    .find((link) => link.href === pathname || pathname.startsWith(link.href))
    ?.href;
}
