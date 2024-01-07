import { Card, CardContent, CardTitle } from "@/components/ui/card";
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

export async function PortfolioTable({ userId }: { userId: string }) {
  const portfolios = await prisma.portfolio.findMany({
    where: { userId },
    include: {
      PortfolioAsset: {
        include: { AssetValue: true },
      },
    },
  });
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
                <TableCell>
                  {portfolio.PortfolioAsset.reduce(
                    (acc, asset) =>
                      acc +
                      asset.AssetValue.sort(
                        (a, b) => a.date.getTime() - b.date.getTime(),
                      )[0].value,
                    0,
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
