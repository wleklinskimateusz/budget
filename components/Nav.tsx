"use client";

import { twMerge } from "tailwind-merge";
import { NavItem } from "./ui/NavItem";
import { usePathname } from "next/navigation";
import { ComponentProps, useEffect, useState } from "react";

type NavProps = {
  className?: string;
};

const links = [
  { href: "/", icon: "20-view-dashboard", children: "Dashboard" },
  { href: "/categories", icon: "20-card", children: "Categories" },
] as const satisfies ComponentProps<typeof NavItem>[];

export const Nav = ({ className }: NavProps) => {
  const active = useActive();
  return (
    <nav className={twMerge("basis-40 bg-neutral-100 shadow py-10", className)}>
      <ul className="flex flex-col">
        {links.map((link) => (
          <NavItem
            key={link.href}
            href={link.href}
            icon={link.icon}
            active={active === link.href}
          >
            {link.children}
          </NavItem>
        ))}
      </ul>
    </nav>
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
