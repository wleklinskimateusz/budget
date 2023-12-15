import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link
        href={{
          search: "q=nextjs",
        }}
      >
        <button className="btn btn-primary">Click me</button>
        <div className="fixed top-5 right-5">
          <UserButton afterSignOutUrl="/" />
        </div>
      </Link>
    </main>
  );
}
