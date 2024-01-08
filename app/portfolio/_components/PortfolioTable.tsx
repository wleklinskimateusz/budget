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
import { useQuery } from "@tanstack/react-query";

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
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>Total Assets</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolios.map((portfolio) => (
              <TableRow key={portfolio.id}>
                <TableCell className="font-medium">{portfolio.name}</TableCell>
                <TableCell>{portfolio.type}</TableCell>
                <TableCell>{portfolio.description}</TableCell>
                <TableCell>{portfolio.goal}</TableCell>
                <TableCell>0$</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
