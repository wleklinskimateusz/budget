import prisma from "@/prisma/client";
import { Portfolio } from "@prisma/client";

export async function addPortfolio(portfolio: Omit<Portfolio, "id">) {
  return await prisma.portfolio.create({
    data: portfolio,
  });
}
