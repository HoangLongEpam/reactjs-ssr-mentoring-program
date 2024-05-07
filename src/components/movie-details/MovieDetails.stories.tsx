import type { Meta, StoryObj } from "@storybook/react";
import { MovieDetails } from "./MovieDetails";
import { movies } from "../../shared/constants/Movies";

const meta = {
  title: "Movie/MovieDetails",
  component: MovieDetails,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MovieDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

const movie = movies[0];
export const Default: Story = {
  args: {
    movie,
  },
};
