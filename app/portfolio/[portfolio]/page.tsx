import { Header } from "@/components/Header";
import { EditPortfolioButton } from "./_component/EditPortfolioButton";
import { getPortfolio } from "../_server/getPortfolio";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioDetails } from "./_component/PortfolioDetails";
import { currentUser } from "@clerk/nextjs";
import { DeletePortfolioButton } from "./_component/DeletePortfolio";

export default async function PortfolioPage({
  params: { portfolio: portfolioId },
}: {
  params: { portfolio: string };
}) {
  const portfolio = await getPortfolio(portfolioId);
  const user = await currentUser();
  if (!user) return null;

  if (!portfolio) return null;

  if (portfolio.userId !== user.id) throw new Error("Unauthorized");

  return (
    <>
      <Header
        title={portfolio.name}
        action={
          <div className="flex gap-2">
            <EditPortfolioButton {...portfolio} />
            <DeletePortfolioButton {...portfolio} />
          </div>
        }
      />
      <main className="w-full flex-grow overflow-y-auto p-2">
        <PortfolioDetails portfolio={portfolio} />
        <div className="grid w-full flex-grow grid-cols-3 gap-4">
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
