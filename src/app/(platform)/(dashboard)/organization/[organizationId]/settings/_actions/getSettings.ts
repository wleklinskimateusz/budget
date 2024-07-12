"use server";

import { db } from "@/drizzle/db";
import { settingsTable, usedCurrenciesTable } from "@/drizzle/schema";
import type { OrgId } from "@/types/Id";
import { eq } from "drizzle-orm";

export async function getSettings(orgId: OrgId) {
  const settings = await db
    .select({
      id: settingsTable.settingsTableId,
      currency: usedCurrenciesTable.currency,
      isDefault: usedCurrenciesTable.isDefault,
      language: settingsTable.language,
    })
    .from(settingsTable)
    .where(eq(settingsTable.orgId, orgId))
    .fullJoin(
      usedCurrenciesTable,
      eq(usedCurrenciesTable.settingsTableId, settingsTable.settingsTableId),
    )
    .execute();

  const setting = settings[0];
  if (!setting) {
    return undefined;
  }

  if (settings.find((setting) => setting.id !== setting.id)) {
    throw new Error("Multiple settings found for organization");
  }
  const currencies = settings.map((setting) => ({
    currency: setting.currency,
    isDefault: setting.isDefault === true,
  }));
  return {
    language: setting.language,
    currencies,
  };
}
