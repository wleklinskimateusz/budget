import type { OrgId } from "@/types/Id";
import { boolean, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";
import type { EnumValue } from "./types";
import { currencyCodes } from "@/data/currency-codes";
import { relations } from "drizzle-orm";

export const currencyEnum = pgEnum("currency", currencyCodes);
export const languageEnum = pgEnum("language", ["PL", "EN"]);

export const usedCurrenciesTable = pgTable("used_currencies", {
  usedCurrencyId: serial("used_currency_id").primaryKey(),

  settingsTableId: serial("settings_table_id")
    .notNull()
    .references(() => settingsTable.settingsTableId, { onDelete: "cascade" }),
  currency: currencyEnum("currency").notNull(),
  isDefault: boolean("is_default").notNull(),
});

export const settingsTable = pgTable("settings", {
  settingsTableId: serial("settings_table_id").primaryKey(),
  orgId: text("org_id").$type<OrgId>().notNull(),
  language: languageEnum("language"),
});

export const currencyValues = currencyEnum.enumValues;
export const languageValues = languageEnum.enumValues;

export type Currency = EnumValue<typeof currencyEnum>;
export type Language = EnumValue<typeof languageEnum>;
