"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Portfolio } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { deletePortfolio } from "../../_server/deletePortfolio";
import { useState } from "react";

export const DeletePortfolioButton = ({ id }: Pick<Portfolio, "id">) => {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: () => deletePortfolio({ id }),
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["portfolios"],
      });
    },
    onSuccess: () => {
      toast(`Portfolio deleted`);
    },
    onError: (error) => {
      toast(error.message);
    },
  });

  if (mutation.status === "pending") return <div>Loading...</div>;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Portfolio</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={() => mutation.mutate()}>
          <DialogHeader>
            <DialogTitle>Delete Portfolio</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this portfolio? This action cannot
              be undone. This will permanently delete the portfolio and all of
              assets in it.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" type="submit">
              I am sure
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
