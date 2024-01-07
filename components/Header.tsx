"use client";
import { usePathname } from "next/navigation";

const useHeaderText = () => {
  const pathname = usePathname();
  if (pathname === "/") return "Dashboard";

  if (pathname === "/portfolio") return "Portfolio of Assets";

  return pathname;
};

export const Header = () => {
  const pathname = useHeaderText();
  return (
    <header className="flex bg-slate-50 p-4 shadow">
      <h1 className="text-lg  font-medium">{pathname}</h1>
    </header>
  );
};
