import type { Meta, StoryObj } from "@storybook/react";

import { Logo } from "./logo";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Logo> = {
  component: Logo,
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {};
