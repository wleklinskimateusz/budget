"use server";

import prisma from "@/prisma/client";

export async function getPortfolios(userId: string) {
  return await prisma.portfolio.findMany({
    where: { userId },
    include: {
      PortfolioAsset: {
        include: { AssetValue: true },
      },
    },
  });
}
