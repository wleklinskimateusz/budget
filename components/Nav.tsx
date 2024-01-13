"use client";

import type { SVGProps } from "react";
import { NavItem, Sidebar } from "./sidebar";
import { usePathname } from "next/navigation";

type NavProps = {
  className?: string;
};

export const Nav = ({ className }: NavProps) => {
  const pathname = usePathname();

  return (
    <Sidebar className="h-screen">
      <NavItem
        active={"/" === pathname}
        href="/"
        icon={<LayoutDashboardIcon className="h-4 w-4" />}
      >
        Dashboard
      </NavItem>
      <NavItem
        active={"/budget" === pathname}
        href="/budget"
        icon={<GoalIcon className="h-4 w-4" />}
      >
        Budget
      </NavItem>
      <NavItem
        active={"/portfolio" === pathname}
        href="/portfolio"
        icon={<PocketIcon className="h-4 w-4" />}
      >
        Portfolio
      </NavItem>
    </Sidebar>
  );
};

function LayoutDashboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function GoalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 13V2l8 4-8 4" />
      <path d="M20.55 10.23A9 9 0 1 1 8 4.94" />
      <path d="M8 10a5 5 0 1 0 8.9 2.02" />
    </svg>
  );
}

function PocketIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z" />
      <polyline points="8 10 12 14 16 10" />
    </svg>
  );
}
