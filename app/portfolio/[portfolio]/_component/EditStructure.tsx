"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Portfolio, PortfolioStructureItem } from "@prisma/client";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Icon } from "@virtuslab/tetrisly-icons";

export const EditStructure = ({
  id,
  structure,
}: {
  id: Portfolio["id"];
  structure: PortfolioStructureItem[];
}) => {
  const total = `${Math.floor(0.75 * 100)}%`;
  return (
    <div className="w-full max-w-md">
      <DialogHeader>
        <DialogTitle>Change Structure</DialogTitle>
      </DialogHeader>
      <form className="my-4 flex w-full gap-2 space-x-2">
        <div>
          <Label htmlFor="asset-name">Asset Name</Label>
          <Input className="flex-1" id="asset-name" name="asset-name" />
        </div>
        <div>
          <Label htmlFor="asset-percentage">Percentage</Label>
          <Input
            className="w-24"
            id="asset-percentage"
            name="asset-percentage"
            type="number"
          />
        </div>
        <Button className="flex-grow self-end" type="submit">
          Add Asset
        </Button>
      </form>
      <div className="space-y-4">
        {structure.map((asset) => (
          <AssetRow key={asset.name} percent={asset.goal} name={asset.name} />
        ))}
      </div>
      <div className="mt-6">
        <div className="h-2 rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-green-500"
            style={{
              width: `${total}`,
            }}
          />
        </div>
        <p className="mt-2 text-right">{total}</p>
      </div>
    </div>
  );
};

const AssetRow = ({ name, percent }: { name: string; percent: number }) => {
  const mutation = useMutation({
    mutationFn: async () => {},
  });
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={() => mutation.mutate()}
          variant="destructive"
          size="icon"
          className="h-fit w-fit p-1"
        >
          <Icon name="20-delete" />
        </Button>
        <span className="font-medium">{name}</span>
      </div>
      <span className="font-medium">{Math.floor(percent * 100)}%</span>
    </div>
  );
};
