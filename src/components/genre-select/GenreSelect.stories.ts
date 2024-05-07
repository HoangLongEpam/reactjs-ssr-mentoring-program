import type { Meta, StoryObj } from "@storybook/react";
import GenreSelect from "./GenreSelect";

const exampleGenres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Thriller",
  "Western",
];

const meta = {
  title: "Movie/GenreSelect",
  component: GenreSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    selectedGenre: {
      control: "select",
      options: exampleGenres,
    },
  },
} satisfies Meta<typeof GenreSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    genres: exampleGenres.map((genre) => ({name: genre, value: genre})),
    selectedGenre: "Action",
    onSelect: (genre: string) => `Selected genre: ${genre}console.log`,
  },
};
