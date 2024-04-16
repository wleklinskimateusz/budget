import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import "./platform.css";

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
