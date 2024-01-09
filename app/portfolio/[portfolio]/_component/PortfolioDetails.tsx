"use client";

import { Portfolio } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getPortfolio } from "../../_server/getPortfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatCurrency";

export const PortfolioDetails = ({
  portfolio: initialPortfolio,
}: {
  portfolio: Portfolio;
}) => {
  const { data: portfolio } = useQuery({
    queryKey: ["portfolio", "portfolios"],
    queryFn: () => getPortfolio(initialPortfolio.id),
    initialData: initialPortfolio,
  });
  if (!portfolio) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="font-bold">Name</div>
            <div>{portfolio.name}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-bold">Type</div>
            <div>{portfolio.type}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-bold">Goal</div>
            <div>{formatCurrency(portfolio.goal, "PLN")}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-bold">Description</div>
            <div>{portfolio.description}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
