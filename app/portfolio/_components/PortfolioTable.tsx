"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { getPortfolios } from "../_server/getPortfolios";
import { useMutationState, useQuery } from "@tanstack/react-query";
import { Portfolio, PortfolioType } from "@prisma/client";
import { z } from "zod";
import { formatCurrency } from "@/lib/formatCurrency";

export function PortfolioTable({ userId }: { userId: string }) {
  const {
    data: portfolios,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["portfolios"],
    initialData: [],
    queryFn: async () => await getPortfolios(userId),
  });
  const variables = useMutationState({
    filters: { mutationKey: ["addPortfolio"], status: "pending" },
    select: (mutation) => mutation.state.variables,
  });
  const schema = z.object({
    name: z.string(),
    type: z.nativeEnum(PortfolioType),
    description: z.string().nullable(),
    goal: z.number().nullable(),
  });
  const data = schema.safeParse(variables[0]);
  const optimisticData = data.success ? data.data : undefined;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!portfolios) return null;
  return (
    <Card className="col-span-2">
      <CardContent>
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>Total Assets</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolios.map((portfolio) => (
              <PortfolioTableRow key={portfolio.id} portfolio={portfolio} />
            ))}
            <PortfolioTableRow
              className="opacity-30"
              portfolio={optimisticData}
            />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

const PortfolioTableRow = ({
  className,
  portfolio,
}: {
  portfolio?: Pick<Portfolio, "name" | "type" | "goal">;
  className?: string;
}) => {
  if (!portfolio) return null;
  const { name, type, goal } = portfolio;
  return (
    <TableRow className={className}>
      <TableCell className="w-32 font-medium">{name}</TableCell>
      <TableCell>{type.toLocaleLowerCase()}</TableCell>
      <TableCell>{formatCurrency(goal, "PLN")}</TableCell>
      <TableCell>{formatCurrency(0, "PLN")}</TableCell>
    </TableRow>
  );
};
