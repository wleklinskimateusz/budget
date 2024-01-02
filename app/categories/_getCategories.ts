"use server";

import prisma from "@/prisma/client";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export async function addCategory(userId: string, formData: FormData) {
  const name = z.string().parse(formData.get("name"));
  await prisma.categories.create({
    data: {
      name,
      userId,
    },
  });
  console.log("Added category");
  revalidateTag("categories");
}
