"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import prisma from "@/prisma/client";
import { auth, useUser } from "@clerk/nextjs";
import { z } from "zod";
import { unstable_cache as cache, revalidateTag } from "next/cache";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { addCategory } from "./_getCategories";

const getCateogries = cache(
  async (userId: string) => {
    return await prisma.categories.findMany({
      where: {
        userId,
      },
    });
  },
  ["categories"],
  { tags: ["categories"] }
);

export default function Categories() {
  const { user } = useUser();
  if (!user) return null;

  return (
    <>
      <form
        className="flex flex-col gap-4 p-4"
        action={async (formData) => {
          await addCategory(user.id, formData);
          toast.success("Category added");
        }}
      >
        <div>
          <Input name="name" />
          <Label htmlFor="name">Name</Label>
        </div>
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
