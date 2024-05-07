import type { Meta, StoryObj } from "@storybook/react";
import { Movie } from "../../shared/models/Movie";
import { MovieTile } from "./MovieTile";

const meta = {
  title: "Movie/MovieTile",
  component: MovieTile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MovieTile>;

export default meta;

type Story = StoryObj<typeof meta>;

const movie: Movie = {
  id: 1,
  poster_path:
    "https://marketplace.canva.com/EAFTl0ixW_k/1/0/1131w/canva-black-white-minimal-alone-movie-poster-YZ-0GJ13Nc8.jpg",
  title: "Walk Alone",
  release_date: new Date().toDateString(),
  genres: ["Documentary", "Comedy"],
  vote_average: 7.5,
  runtime: 120,
  overview:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at metus ut diam fermentum pulvinar. Aliquam sed porttitor est. Aliquam porttitor tincidunt tellus id aliquam. Vestibulum eget tempor purus, quis varius elit. Suspendisse sit amet sagittis est. Nam diam libero, egestas et sapien ut, mattis consectetur neque. Nam at metus lectus. Praesent sagittis nulla ut ipsum pellentesque, vel aliquet mauris dapibus. Praesent pretium dictum ex, vitae rutrum nulla. Praesent euismod ut magna nec mattis. Sed efficitur bibendum felis, non viverra velit lacinia in.",
};

export const Default: Story = {
  args: {
    movie,
    onMovieClick: (_: Movie) => {},
    onDeleteClick: (_: Movie) => {},
    onEditClick: (_: Movie) => {},
  },
};
