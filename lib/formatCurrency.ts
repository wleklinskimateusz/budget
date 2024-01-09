const localeCurrency = {
  USD: "en-US",
  EUR: "de-DE",
  PLN: "pl-PL",
} as Record<string, string>;

export function formatCurrency(
  amount: number | null | undefined,
  currency: string,
  locale?: string,
) {
  if (amount === null || amount === undefined) {
    return "";
  }
  return new Intl.NumberFormat(locale || localeCurrency[currency] || "en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}
