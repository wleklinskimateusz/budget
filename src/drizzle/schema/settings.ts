import type { OrgId } from "@/types/Id";
import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import type { EnumValue } from "./types";

export const currencyEnum = pgEnum("currency", ["PLN", "EUR", "USD"]);
export const languageEnum = pgEnum("language", ["PL", "EN"]);

export const settingsTable = pgTable("settings", {
  orgId: text("org_id").$type<OrgId>().primaryKey().notNull(),
  currency: currencyEnum("currency"),
  language: languageEnum("language"),
});

export const currencyValues = currencyEnum.enumValues;
export const languageValues = languageEnum.enumValues;

export type Currency = EnumValue<typeof currencyEnum>;
export type Language = EnumValue<typeof languageEnum>;
