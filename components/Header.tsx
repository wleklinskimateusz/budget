"use client";
import { usePathname } from "next/navigation";
import { Button } from "./ui/Button";

type HeaderInfo = {
  title: string;
  action?: () => void;
  actionLabel?: string;
};

const headerInfo: Record<string, HeaderInfo> = {
  "/": {
    title: "Dashboard",
  },
  "/portfolio": {
    title: "Portfolio of Assets",
    action: () => {},
    actionLabel: "Add Portfolio",
  },
  "/budget": {
    title: "Budget",
  },
  "/assets/tbond": {
    title: "Tbonds",
    action: () => {},
    actionLabel: "Add Tbonds",
  },
};

export const Header = () => {
  const pathname = usePathname();
  const { title, action, actionLabel } = headerInfo[pathname];
  return (
    <header className="flex items-center justify-between bg-slate-50 p-4 shadow">
      <h1 className="text-lg font-medium">{title}</h1>
      <ActionButton action={action} actionLabel={actionLabel} />
    </header>
  );
};
const ActionButton = ({
  action,
  actionLabel,
}: Pick<HeaderInfo, "action" | "actionLabel">) => {
  if (!action) return null;
  return <Button onClick={action}>{actionLabel}</Button>;
};
