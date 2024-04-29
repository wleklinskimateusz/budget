import { afterEach, describe, expect, it, vi } from "vitest";
import { mutateSettings } from "./mutateSettings";
import prisma from "@/lib/__mocks__/prisma";
import { revalidateTag } from "next/cache";

// how to check if revalidateTag is called?

vi.mock("@/lib/prisma");
vi.mock("next/cache", () => ({
  revalidateTag: vi.fn(),
}));

describe("mutateSettings", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should call prisma.settings.upsert with the correct arguments", async () => {
    const formData = new FormData();
    formData.set("currency", "USD");
    formData.set("language", "EN");

    await mutateSettings(formData, "orgId");

    expect(revalidateTag).toHaveBeenCalled();

    expect(prisma.settings.upsert).toHaveBeenCalledWith({
      where: { orgId: "orgId" },
      update: { currency: "USD", language: "EN" },
      create: { currency: "USD", language: "EN", orgId: "orgId" },
    });
  });
});
