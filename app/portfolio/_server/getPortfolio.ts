"use server";

import prisma from "@/prisma/client";
import { Portfolio } from "@prisma/client";

export async function getPortfolio(id: Portfolio["id"]) {
  const result = await prisma.portfolio.findUnique({
    where: { id },
    include: {
      PortfolioStructureItem: {},
    },
  });
  return result;
}
