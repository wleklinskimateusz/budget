"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { EditStructure } from "./EditStructure";
import { TypesChart } from "./MyChart";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Portfolio, PortfolioStructureItem } from "@prisma/client";

export const PortfolioStructure = ({
  id,
  structure,
}: {
  id: Portfolio["id"];
  structure: PortfolioStructureItem[];
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Portfolio Structure</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Change Structure</Button>
          </DialogTrigger>
          <DialogContent>
            <EditStructure id={id} structure={structure} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="h-80 w-full">
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
  );
};
