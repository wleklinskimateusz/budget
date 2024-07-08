import { db } from "@/drizzle/db";
import { settingsTable, usedCurrenciesTable } from "@/drizzle/schema";
import type { OrgId } from "@/types/Id";
import { NextResponse } from "next/server";

export async function GET() {
  const currencies = ["USD", "EUR"] as const;
  const defaultCurrency = "USD";

  const orgId = "ABC" as OrgId;
  const language = "EN";

  await db.transaction(async (trx) => {
    const id = await trx
      .insert(settingsTable)
      .values({
        orgId,
        language,
      })
      .returning({ id: settingsTable.settingsTableId })
      .then((rows) => rows[0]?.id);

    console.log("new settings created id", id);
    if (!id) {
      console.log("Failed to insert settings");
      throw new Error("Failed to insert settings");
    }

    if (currencies.length > 0) {
      for (const currency of currencies) {
        try {
          await trx.insert(usedCurrenciesTable).values({
            settingsTableId: id, // foreign key
            currency,
            isDefault: currency === defaultCurrency,
          });
        } catch (e) {
          console.error("Failed to insert currency", currency, e);
          throw e;
        }
      }
    }
  });

  return NextResponse.json({ success: true });
}
