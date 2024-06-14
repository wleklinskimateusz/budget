import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import "./platform.css";
import { Providers } from "./Providers";

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <Providers>{children}</Providers>
    </ClerkProvider>
  );
}
