import { assertType, describe, expect, it, vi } from "vitest";
import { SettingsForm } from "./settings-form";
import { render, screen } from "@testing-library/react";
import { useFormStatus } from "react-dom";

vi.mock("../_actions/mutateSettings", () => ({
  mutateSettings: vi.fn<[FormData, string], Promise<void>>(),
}));

vi.mock("react-dom", () => ({
  useFormStatus: vi.fn<[], { pending: boolean }>(),
}));

describe("<SettingsForm />", () => {
  it("should make sure the correct props are passed", () => {
    // @ts-expect-error
    assertType(<SettingsForm />);
    assertType(
      <SettingsForm orgId="abc" currency={undefined} language={undefined} />,
    );
  });
  it("should call mutateSettings with the correct arguments", () => {
    vi.mocked(useFormStatus).mockReturnValue({ pending: false } as any);
    const { getByTestId } = render(
      <SettingsForm orgId="orgId" currency="USD" language="EN" />,
    );
    const currencySelect = getByTestId("currency-trigger");

    // screen get by option with value="EUR"
    const EUROption = screen.queryByText("EUR");
    expect(EUROption).not.toBeVisible();
    currencySelect.click();
  });
});
