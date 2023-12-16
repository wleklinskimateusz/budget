import { NavItem } from "../../components/ui/NavItem";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: NavItem,
  tags: ["ui", "navigation", "navitem"],
  args: {
    className: "list-none",
  },
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Dashboard",
    href: "/",
  },
};

export const Active: Story = {
  args: {
    children: "Dashboard",
    href: "/",
    active: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: "Home",
    href: "/",
    icon: "20-home",
  },
};

export const WithIconActive: Story = {
  args: {
    children: "Dashboard",
    href: "/",
    icon: "20-view-dashboard",
    active: true,
  },
};
