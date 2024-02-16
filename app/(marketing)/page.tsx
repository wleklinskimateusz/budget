import Link from "next/link";
import { Poppins } from "next/font/google";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function MarketingPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-5">
      <div className="flex max-w-2xl flex-col items-center justify-center gap-2">
        <h1 className="mb-6 text-center font-serif text-3xl text-neutral-800 md:text-6xl">
          Master Your Finances with KoderKash
        </h1>
        <p
          className={cn(
            "text-small mx-auto mt-4 max-w-xs text-center text-neutral-400 md:max-w-2xl md:text-xl",
            textFont.className,
          )}
        >
          Empowering you to budget better, save smarter, and spend wisely.
          Unlock your financial potential today.
        </p>
      </div>
      <Button size="lg" asChild>
        <Link href="/sign-up">Get Started</Link>
      </Button>
    </section>
  );
}
