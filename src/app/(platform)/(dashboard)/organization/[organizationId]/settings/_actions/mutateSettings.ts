"use server";

import { db } from "@/drizzle/db";
import { settingsTable } from "@/drizzle/schema";
import { OrgId } from "@/types/Id";
import { Currency, Language } from "@prisma/client";
import { revalidateTag } from "next/cache";

export async function mutateSettings(
  formData: FormData,
  organizationId: OrgId,
) {
  const currency = formData.get("currency");
  const language = formData.get("language");
  assertCurrency(currency);
  assertLanguage(language);

  await db
    .insert(settingsTable)
    .values({
      orgId: organizationId,
      currency,
      language,
    })
    .onConflictDoUpdate({
      target: settingsTable.orgId,
      set: { orgId: organizationId },
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
