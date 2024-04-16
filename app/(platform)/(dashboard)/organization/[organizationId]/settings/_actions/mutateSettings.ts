"use server";

import prisma from "@/lib/prisma";
import { Currency, Language } from "@prisma/client";
import { revalidateTag } from "next/cache";

export async function mutateSettings(
  formData: FormData,
  organizationId: string,
) {
  const currency = formData.get("currency");
  const language = formData.get("language");
  assertCurrency(currency);
  assertLanguage(language);

  await prisma.settings.upsert({
    where: { orgId: organizationId },
    update: { currency, language },
    create: { currency, language, orgId: organizationId },
  });
  revalidateTag("settings_" + organizationId);
}

function assertCurrency(currency: unknown): asserts currency is Currency {
  if (typeof currency !== "string" || !(currency in Currency)) {
    throw new Error("Invalid currency");
  }
}

function assertLanguage(language: unknown): asserts language is Language {
  if (typeof language !== "string" || !(language in Language)) {
    throw new Error("Invalid language");
  }
}
