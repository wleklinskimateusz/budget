import { Header } from "@/components/Header";
import { EditPortfolioButton } from "./_component/EditPortfolioButton";
import { getPortfolio } from "../_server/getPortfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { currentUser } from "@clerk/nextjs";
import { DeletePortfolioButton } from "./_component/DeletePortfolio";
import { PortfolioDetails } from "@/app/portfolio/[portfolio]/_component/PortfolioDetails";
import { PortfolioAssets } from "./_component/PortfolioAssets";
import { TypesChart } from "./_component/MyChart";

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
        <PortfolioDetails {...portfolio} />
        <div className="grid w-full flex-grow grid-cols-3 gap-4">
          <PortfolioAssets />
          <Card>
            <CardHeader>
              <CardTitle>Future Graphs</CardTitle>
            </CardHeader>
            <CardContent className=" h-80 w-full">
              <TypesChart
                data={[
                  { name: "Gold", ideal: 400, real: 382 },
                  { name: "Crypto", ideal: 300, real: 221 },
                  { name: "Stocks", ideal: 300, real: 145 },
                  { name: "Bonds", ideal: 200, real: 552 },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
