"use client";

import { twMerge } from "tailwind-merge";
import { ComponentProps, ReactNode } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
        <NavDashoardItem
          groupName="Assets"
          items={[
            { href: "/assets/tbond", icon: "20-wallet", children: "Tbonds" },
            {
              href: "/assets/account",
              icon: "20-wallet",
              children: "Savings account",
            },
          ]}
        />
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

const NavDashoardItem = ({
  groupName,
  items,
}: {
  groupName: string;
  items: NavItemProps[];
}) => (
  <NavigationMenuItem className="relative w-full flex-1">
    <NavigationMenuTrigger className="flex w-full justify-between">
      {groupName}
    </NavigationMenuTrigger>
    <NavigationMenuContent className="absolute left-1 right-1 top-full w-full flex-grow shadow">
      {items.map((props) => (
        <NavItem key={props.href} {...props} />
      ))}
    </NavigationMenuContent>
  </NavigationMenuItem>
);
