import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("utils", () => {
  it("cn: should merge tailwind classnames", () => {
    const input = ["text-red-500", "bg-blue-500"];
    const output = "text-red-500 bg-blue-500";
    expect(cn(...input)).toBe(output);
  });
  it("cn: should merge tailwind classnames with conflicting values", () => {
    const input = ["text-red-500", "text-blue-500"];
    const output = "text-blue-500";
    expect(cn(...input)).toBe(output);
  });
});
