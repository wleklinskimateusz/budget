"use server";

import prisma from "@/prisma/client";
import { Portfolio } from "@prisma/client";

export async function getPortfolioStructure(portfolioId: Portfolio["id"]) {
  return await prisma.portfolioStructureItem.findMany({
    where: {
      portfolioId,
    },
  });
}
