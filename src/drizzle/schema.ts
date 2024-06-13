import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { OrgId } from "@/types/Id";

export const currencyEnum = pgEnum("currency", ["PLN", "EUR", "USD"]);
export const languageEnum = pgEnum("language", ["PL", "EN"]);

export const settingsTable = pgTable("settings", {
  orgId: text("org_id").$type<OrgId>().primaryKey().notNull(),
  currency: currencyEnum("currency"),
  language: languageEnum("language"),
});
