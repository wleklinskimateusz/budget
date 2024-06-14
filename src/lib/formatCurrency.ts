import { Currency } from "@/drizzle/schema";
import { Branded } from "@/types/Branded";

const localeCurrency = {
  USD: "en-US",
  EUR: "de-DE",
  PLN: "pl-PL",
} as const satisfies Record<Currency, string>;

export type CurrencyString = Branded<string, "currency">;

export function formatCurrency(
  amount: number,
  currency: keyof typeof localeCurrency,
) {
  return new Intl.NumberFormat(localeCurrency[currency], {
    style: "currency",
    currency: currency,
  }).format(amount) as CurrencyString;
}
