import { Button } from "../../components/ui/Button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Button,
  tags: ["ui", "button"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: {
    children: "Neutral Button",
  },
};

export const Brand: Story = {
  args: {
    variant: "brand",
    children: "Brand Button",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Danger Button",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success Button",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning Button",
  },
};
