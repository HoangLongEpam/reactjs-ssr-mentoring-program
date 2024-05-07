import { Movie } from "../shared/models/Movie";
import { axiosInstance } from "./api-instances";

export interface GetMoviesParams {
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  searchBy?: string;
  filter?: string;
  offset?: number;
  limit?: number;
}

export interface GetMoviesResponse {
  totalAmount: number;
  offset: number;
  limit: number;
  data: Movie[];
}

const defaultGetMoviesParams: GetMoviesParams = {
  limit: 12,
  offset: 0,
  sortOrder: "desc",
  searchBy: "title",
};

export const getMovies = async (
  params?: GetMoviesParams
): Promise<GetMoviesResponse> => {
  const response = await axiosInstance.get("/movies", {
    params: {
      ...defaultGetMoviesParams,
      ...params,
    },
  });
  return response.data;
};

export const updateMovie = async (movie: Movie): Promise<Movie> => {
  console.log("Fk")
  const response = await axiosInstance.put(`/movies`, movie);
  return response.data;
};

export const getMovieById = async (id: string): Promise<Movie> => {
  const response = await axiosInstance.get(`/movies/${id}`);
  return response.data;
};

export const addMovie = async (movie: Movie): Promise<Movie> => {
  const response = await axiosInstance.post(`/movies`, movie);
  return response.data;
};
