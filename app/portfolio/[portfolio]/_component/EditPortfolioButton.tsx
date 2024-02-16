"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Portfolio, PortfolioType } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { editPortfolio } from "../../_server/editPortfolio";
import { Skeleton } from "@/components/ui/skeleton";

export const EditPortfolioButton = ({
  id,
  name,
  description,
  goal,
  type,
}: Omit<Portfolio, "userId">) => {
  const { user, isLoaded } = useUser();
  const mutation = useEditMutation();

  if (!isLoaded) return <Skeleton className="h-9 w-32" />;
  if (!user) return null;
  if (mutation.status === "pending") return <div>Loading...</div>;

  const formAction = (formData: FormData) => {
    const userId = user.id;

    const data = formSchema.parse(Object.fromEntries(formData.entries()));
    mutation.mutate({ ...data, userId, id });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Portfolio</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Edit Portfolio</DialogTitle>
            <DialogDescription>
              Add a new Portfolio of Assets. It's a defined group of assets that
              behave a certain way (for example emergency fund or retirement).
              Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                required
                defaultValue={name}
                id="name"
                name="name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                defaultValue={description ?? ""}
                name="description"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="goal" className="text-right">
                Goal
              </Label>
              <Input
                id="goal"
                defaultValue={goal ?? ""}
                name="goal"
                type="number"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="goal" className="text-right">
                Type
              </Label>
              <Select defaultValue={type} required name="type">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(PortfolioType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.toLocaleLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const formSchema = z.object({
  name: z.string(),
  description: z.string().optional().transform(toNullable),
  goal: z.string().optional().transform(Number).transform(toNullable),
  type: z.nativeEnum(PortfolioType),
});

function toNullable<T>(value: T | undefined): T | null {
  if (value === undefined) return null;
  return value;
}

function useEditMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editPortfolio,
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["portfolio", "portfolios"],
      });
    },
    onSuccess: ({ name }) => {
      toast.success(`Portfolio ${name} edited`);
    },
    onError: (error) => {
      toast(error.message);
    },
  });
  return mutation;
}
