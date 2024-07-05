"use server";

import { currencyEnum, languageEnum, settingsTable } from "@/drizzle/schema";
import { OrgId } from "@/types/Id";
import { revalidateTag } from "next/cache";
import type { Currency, Language } from "@/drizzle/schema/settings";
import { db } from "@/drizzle/db";

export async function mutateSettings(
  formData: FormData,
  organizationId: OrgId,
) {
  const currency = formData.get("currency");
  const language = formData.get("language");
  assertCurrency(currency);
  assertLanguage(language);
  updateSettings(organizationId, currency, language);

  revalidateTag("settings_" + organizationId);
}

function assertCurrency(currency: unknown): asserts currency is Currency {
  if (!currencyEnum.enumValues.includes(currency as Currency)) {
    throw new Error("Invalid currency");
  }
}

function assertLanguage(language: unknown): asserts language is Language {
  if (!languageEnum.enumValues.includes(language as Language)) {
    throw new Error("Invalid language");
  }
}

async function updateSettings(
  orgId: OrgId,
  currency: Currency | undefined = undefined,
  language: Language | undefined = undefined,
) {
  return await db
    .insert(settingsTable)
    .values({
      orgId,
      currency,
      language,
    })
    .onConflictDoUpdate({
      target: settingsTable.orgId,
      set: { currency, language, orgId },
    })
    .execute();
}
