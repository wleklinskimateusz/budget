"use server";

import prisma from "@/prisma/client";
import type { Portfolio } from "@prisma/client";

export async function editPortfolio(portfolio: Portfolio) {
  return await prisma.portfolio.update({
    where: { id: portfolio.id },
    data: portfolio,
  });
}
