import { ReactNode } from "react";
import { Button } from "./ui/Button";

type HeaderProps = {
  title: string;
  action?: ReactNode;
  additionalInfo?: ReactNode;
};

export const Header = ({ title, action, additionalInfo }: HeaderProps) => {
  return (
    <header className="shadow-b min- min-h-16 flex h-16 items-center justify-between border-b bg-gray-100/40 px-4 py-2 text-black dark:bg-gray-800/40">
      <div className="flex-1 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      {additionalInfo}
      <div className="flex flex-1 justify-end">{action}</div>
    </header>
  );
};
