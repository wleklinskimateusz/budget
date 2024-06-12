import { ReactNode } from "react";
import { Navbar } from "./_components/navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full grow flex-col ">
      <Navbar />
      {children}
    </div>
  );
}
