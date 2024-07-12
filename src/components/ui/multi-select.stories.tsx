import type { Meta, StoryObj } from "@storybook/react";

import { MultiSelect } from "./multi-select";
import { currencyValues, type Currency } from "@/drizzle/schema";
import { useState } from "react";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof MultiSelect> = {
  component: MultiSelect,
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const Handler = () => {
  const [selected, setSelected] = useState<Currency[]>([]);
  return (
    <MultiSelect
      options={currencyValues}
      values={selected}
      setValues={setSelected}
    />
  );
};

export const Default: Story = {
  render: Handler,
};
