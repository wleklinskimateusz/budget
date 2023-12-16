import { Input } from "../../components/ui/Input";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Input,
  tags: ["ui", "input"],
  argTypes: {
    type: {
      type: "string",
      options: [
        "text",
        "email",
        "search",
        "date",
        "number",
        "password",
        "tel",
        "time",
      ],
      control: {
        type: "select",
      },
    },
    required: {
      type: "boolean",
      control: {
        type: "boolean",
      },
    },
  },
  args: {
    label: "Name",
    type: "text",
    required: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  args: {
    type: "text",
  },
};

export const TextInputRequired: Story = {
  args: {
    type: "text",
    required: true,
  },
};

export const TextInputError: Story = {
  args: {
    type: "text",
    error: true,
  },
};

export const TextInputMessageError: Story = {
  args: {
    type: "text",
    error: "This is an error message",
  },
};

export const EmailInput: Story = {
  args: {
    type: "email",
    name: "email",
    label: "Email",
  },
};

export const SearchInput: Story = {
  args: {
    type: "search",
    name: "search",
    label: "Search",
  },
};

export const DateInput: Story = {
  args: {
    type: "date",
    name: "date",
    label: "Date",
  },
};

export const NumberInput: Story = {
  args: {
    type: "number",
    name: "number",
    label: "Number",
  },
};

export const PasswordInput: Story = {
  args: {
    type: "password",
    name: "password",
    label: "Password",
  },
};

export const TelInput: Story = {
  args: {
    type: "tel",
    name: "tel",
    label: "Tel",
  },
};

export const TimeInput: Story = {
  args: {
    type: "time",
    name: "time",
    label: "Time",
  },
};
