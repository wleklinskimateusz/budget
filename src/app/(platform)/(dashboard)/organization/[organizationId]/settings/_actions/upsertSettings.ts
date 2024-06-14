import { db } from "@/drizzle/db";
import { type Currency, type Language, settingsTable } from "@/drizzle/schema";
import type { OrgId } from "@/types/Id";

export async function upsertSettings(
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
    .returning({
      language: settingsTable.language,
      currency: settingsTable.currency,
    })
    .then((result) => result[0]);
}
