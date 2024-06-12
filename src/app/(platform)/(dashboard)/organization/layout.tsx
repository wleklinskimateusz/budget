import { ReactNode } from "react";
import { Sidebar } from "../_components/sidebar";

export default function OrganizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex h-full max-w-6xl grow flex-col 2xl:max-w-screen-2xl">
      <div className="flex h-full grow gap-x-7">
        <div className="hidden  w-64 shrink-0 bg-slate-50 md:block">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
}
