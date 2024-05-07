import type { Meta, StoryObj } from "@storybook/react";
import { SortControl } from "./SortControl";
import { SortControlOptions } from "../../shared/constants/SortControlOptions";

const meta = {
  title: "Movie/SortControl",
  component: SortControl,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta<typeof SortControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentSort: SortControlOptions.Title,
    onSortChange: (_: SortControlOptions) => {},
  },
};
