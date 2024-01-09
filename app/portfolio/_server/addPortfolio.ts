"use server";

import prisma from "@/prisma/client";
import type { Portfolio } from "@prisma/client";

export async function addPortfolio(portfolio: Omit<Portfolio, "id">) {
  return await prisma.portfolio.create({
    data: portfolio,
  });
}
