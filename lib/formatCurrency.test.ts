import { describe, expect, it } from "vitest";
import { CurrencyString, formatCurrency } from "./formatCurrency";
import { Equal, Expect } from "@/types/type-utils";

describe("formatCurrency", () => {
  it("should format USD currency", () => {
    const amount = 100;
    const currency = "USD";
    const output = "$100.00";
    const result = formatCurrency(amount, currency);

    type test = Expect<Equal<typeof result, CurrencyString>>;

    expect(formatCurrency(amount, currency)).toBe(output);
  });
  it("should format EUR currency", () => {
    const amount = 100;
    const currency = "EUR";
    const output = "100,00\xa0€"; // non-breaking space
    const result = formatCurrency(amount, currency);

    type test = Expect<Equal<typeof result, CurrencyString>>;
    expect(result).toBe(output);
  });

  it("should format PLN currency", () => {
    const amount = 100;
    const currency = "PLN";
    const output = "100,00\xa0zł"; // non-breaking space
    const result = formatCurrency(amount, currency);

    type test = Expect<Equal<typeof result, CurrencyString>>;
    expect(result).toBe(output);
  });
});
