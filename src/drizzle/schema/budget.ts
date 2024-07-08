import type { OrgId } from "@/types/Id";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  time,
} from "drizzle-orm/pg-core";
import type { EnumValue } from "./types";

export const categoryTypeEnum = pgEnum("category_type", [
  "REVENUE", // Money coming in
  "COSTS", // Cost of gaining revenue
  "NEEDS",
  "SAVINGS",
  "WANTS",
]);

export const categoryTable = pgTable("category", {
  categoryId: text("category_id").primaryKey().notNull(),
  name: text("name"),
  type: categoryTypeEnum("category_type"),
  orgId: text("org_id").$type<OrgId>(),
});

export const categoryTypeValues = categoryTypeEnum.enumValues;
export type CategoryType = EnumValue<typeof categoryTypeEnum>;

export const budgetTable = pgTable("budget", {
  budgetId: text("budget_id").primaryKey().notNull(),
  orgId: text("org_id").notNull(),
  month: integer("month").notNull(), // 0-11
  year: integer("year").notNull(), // 2024
  createdAt: time("created_at").defaultNow(),
  updatedAt: time("updated_at").defaultNow(),
});

export const templateBudget = pgTable("default_budget", {
  templatId: text("default_budget_id").primaryKey().notNull(),
  templateName: text("template_name").notNull(),
  orgId: text("org_id").notNull(),
  isDefault: boolean("is_default").notNull(),
});

export const templateItemTable = pgTable("budget_item", {
  itemId: text("item_id").primaryKey().notNull(),
  templateId: text("template_id").notNull(),
  categoryId: text("category_id").notNull(),
  amount: integer("amount").notNull(),
});
