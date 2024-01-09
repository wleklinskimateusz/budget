"use server";

import prisma from "@/prisma/client";
import { Portfolio } from "@prisma/client";

export async function addPortfolio(portfolio: Omit<Portfolio, "id">) {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return await prisma.portfolio.create({
    data: portfolio,
  });
}
