"use server";

import { settingsTable, usedCurrenciesTable } from "@/drizzle/schema";
import type { OrgId } from "@/types/Id";
import { revalidateTag } from "next/cache";
import type { Currency, Language } from "@/drizzle/schema/settings";
import { db } from "@/drizzle/db";
import { and, eq } from "drizzle-orm";
import type { QueryResult } from "@vercel/postgres";

export async function mutateSettings(
  currencies: Currency[],
  defaultCurrency: Currency | undefined,
  language: Language | undefined,
  organizationId: OrgId,
) {
  updateSettings(organizationId, currencies, defaultCurrency, language);

  revalidateTag("settings_" + organizationId);
}

async function updateSettings(
  orgId: OrgId,
  currencies: Currency[] = [],
  defaultCurrency: Currency | undefined = undefined,
  language: Language | undefined = undefined,
) {
  // check if settings Table exists for orgId if not, create one
  const settings = await db
    .select()
    .from(settingsTable)
    .where(eq(settingsTable.orgId, orgId))
    .limit(1)
    .execute()
    .then((rows) => rows[0]);

  if (!settings) {
    return await db.transaction(async (trx) => {
      const id = await trx
        .insert(settingsTable)
        .values({
          orgId,
          language,
        })
        .returning({ id: settingsTable.settingsTableId })
        .then((rows) => rows[0]?.id);

      if (!id) throw new Error("Failed to insert settings");

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
  }

  return await db.transaction(async (tx) => {
    const settingsUpdate = await tx
      .update(settingsTable)
      .set({
        language,
      })
      .where(eq(settingsTable.orgId, orgId));

    if (currencies) {
      const currentCurrencies = await tx
        .select()
        .from(usedCurrenciesTable)
        .where(
          eq(usedCurrenciesTable.settingsTableId, settings.settingsTableId),
        )
        .execute();

      const newCurrencies = currencies.filter(
        (currency) =>
          !currentCurrencies.some(
            (currentCurrency) => currentCurrency.currency === currency,
          ),
      );
      const toDelete = currentCurrencies.filter(
        (currentCurrency) =>
          !currencies.some((currency) => currentCurrency.currency === currency),
      );

      for (const currency of toDelete) {
        await tx
          .delete(usedCurrenciesTable)
          .where(
            and(
              eq(usedCurrenciesTable.settingsTableId, settings.settingsTableId),
              eq(usedCurrenciesTable.currency, currency.currency),
            ),
          );
      }

      for (const currency of newCurrencies) {
        await tx.insert(usedCurrenciesTable).values({
          settingsTableId: settings.settingsTableId,
          currency,
          isDefault: currency === defaultCurrency,
        });
      }

      const oldDefaultCurrency = currencies.find(
        (currency) => currency === defaultCurrency,
      );
      const changingDefault: Promise<QueryResult<never>>[] = [];
      if (
        oldDefaultCurrency &&
        defaultCurrency &&
        oldDefaultCurrency !== defaultCurrency
      ) {
        const changingOldDefault = tx
          .update(usedCurrenciesTable)
          .set({
            isDefault: false,
          })
          .where(
            and(
              eq(usedCurrenciesTable.settingsTableId, settings.settingsTableId),
              eq(usedCurrenciesTable.currency, oldDefaultCurrency),
            ),
          )
          .execute();

        const changingNewDefault = tx
          .update(usedCurrenciesTable)
          .set({
            isDefault: true,
          })
          .where(
            and(
              eq(usedCurrenciesTable.settingsTableId, settings.settingsTableId),
              eq(usedCurrenciesTable.currency, defaultCurrency),
            ),
          )
          .execute();
        changingDefault.push(changingOldDefault, changingNewDefault);
      }

      await Promise.all([settingsUpdate, ...changingDefault]);
    }
  });
}
