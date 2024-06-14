import { ReactNode } from "react";

export default function ClerkLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen items-center justify-center">{children}</div>
  );
}
