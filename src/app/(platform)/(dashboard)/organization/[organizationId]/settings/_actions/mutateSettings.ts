"use server";

import { db } from "@/drizzle/db";
import {
  settingsTable,
  Currency,
  Language,
  currencyEnum,
  languageEnum,
} from "@/drizzle/schema";
import { OrgId } from "@/types/Id";
import { revalidateTag } from "next/cache";
import { upsertSettings } from "./upsertSettings";

export async function mutateSettings(
  formData: FormData,
  organizationId: OrgId,
) {
  const currency = formData.get("currency");
  const language = formData.get("language");
  assertCurrency(currency);
  assertLanguage(language);
  upsertSettings(organizationId, currency, language);

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
