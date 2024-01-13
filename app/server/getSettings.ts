"use server";

import prisma from "@/prisma/client";

export async function getSettings(userId: string) {
  const settings = await prisma.settings.findUnique({
    where: {
      userId,
    },
  });
  return settings;
}
