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
import prisma from "@/prisma/client";
import { unstable_cache as cache } from "next/cache";

export async function PortfolioTable({ userId }: { userId: string }) {
  const getPortfolios = cache(
    async () => {
      return await prisma.portfolio.findMany({
        where: { userId },
        include: {
          PortfolioAsset: {
            include: { AssetValue: true },
          },
        },
      });
    },
    ["portfolios", userId],
    { tags: [userId, "portfolios"] },
  );

  const portfolios = await getPortfolios();

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
