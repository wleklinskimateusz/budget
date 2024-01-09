"use server";

import prisma from "@/prisma/client";
import type { Portfolio } from "@prisma/client";
import { redirect } from "next/navigation";

export async function deletePortfolio({ id }: Pick<Portfolio, "id">) {
  const result = await prisma.portfolio.delete({
    where: { id },
  });
  redirect("/portfolio");
}
