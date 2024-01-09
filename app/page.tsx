import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();
  return (
    <>
      <Header title="Dashboard" />
      <main className="w-full flex-grow overflow-y-auto">
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <Link
            href={{
              search: "q=nextjs",
            }}
          >
            <Button>Search Next.js</Button>
            <Button>Search Next.js</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
