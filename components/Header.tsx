import { ReactNode } from "react";

type HeaderProps = {
  title: string;
  action?: ReactNode;
};

export const Header = ({ title, action }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between bg-slate-50 p-4 shadow">
      <h1 className="text-lg font-medium">{title}</h1>
      {action}
    </header>
  );
};
