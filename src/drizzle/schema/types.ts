import type { PgEnum } from "drizzle-orm/pg-core";

export type EnumValue<T> = T extends PgEnum<infer U> ? U[number] : never;
