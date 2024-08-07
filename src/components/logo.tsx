import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/">
      <div
        className={cn(
          " items-center gap-x-2 transition hover:opacity-75",
          className,
        )}
      >
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
        <p className={cn("pb-1 text-lg text-neutral-700")}>KoderKash</p>
      </div>
    </Link>
  );
};
