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
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioTable({ userId }: { userId: string }) {
  const {
    data: portfolios,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["portfolio", "portfolios"],
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
  if (isError) return <div>Error</div>;
  if (!portfolios && !isLoading) return null;
  console.log(portfolios);
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
            {isLoading && (
              <TableRow>
                <TableCell className="h-4">
                  <Skeleton className="h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4" />
                </TableCell>
              </TableRow>
            )}
            {portfolios?.map((portfolio) => (
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
  portfolio?: Pick<Portfolio, "name" | "type" | "goal"> & {
    id?: Portfolio["id"];
  };
  className?: string;
}) => {
  if (!portfolio) return null;
  const { name, type, goal } = portfolio;
  return (
    <TableRow className={className}>
      <TableCell className=" font-medium">
        <Link href={portfolio.id ? `/portfolio/${portfolio.id}` : ""}>
          {name}
        </Link>
      </TableCell>
      <TableCell>
        <Badge>{type.toLocaleLowerCase()}</Badge>
      </TableCell>
      <GoalCell goal={goal} />
      <TableCell>{formatCurrency(0, "PLN")}</TableCell>
    </TableRow>
  );
};

const GoalCell = ({ goal }: { goal: number | null }) => {
  if (goal === null || goal === 0)
    return <TableCell>Sky is the limit</TableCell>;
  return <TableCell>{formatCurrency(goal, "PLN")}</TableCell>;
};
