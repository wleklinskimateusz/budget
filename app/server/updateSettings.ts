"use server";

import prisma from "@/prisma/client";
import { Settings } from "@prisma/client";

export async function updateSettings(data: Omit<Settings, "id">) {
  const settings = await prisma.settings.upsert({
    where: {
      userId: data.userId,
    },
    update: data,
    create: data,
  });
  return settings;
}
