import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { twMerge } from "tailwind-merge";
import { Nav } from "@/components/Nav";

import { AvatarButton } from "@/components/AvatarButton";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={twMerge(inter.className, "flex")}>
          <div className="flex h-screen flex-col items-center justify-between shadow-lg">
            <Nav />
            <AvatarButton />
          </div>
          <main className="min-h-screen">{children}</main>
          <div className="fixed right-5 top-5"></div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
