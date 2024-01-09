import { currentUser } from "@clerk/nextjs";
import { PortfolioTable } from "./_components/PortfolioTable";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { AddPortfolioButton } from "./_components/AddPortfolioButton";

export default async function PortfolioPage() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  return (
    <>
      <Header title="Portfolio of Assets" action={<AddPortfolioButton />} />
      <main className="w-full flex-grow overflow-y-auto">
        <div className="grid w-full flex-grow grid-cols-3 gap-4 p-2">
          <PortfolioTable userId={user.id} />
          <Card>
            <CardHeader>
              <CardTitle>Future Graphs</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </main>
    </>
  );
}
