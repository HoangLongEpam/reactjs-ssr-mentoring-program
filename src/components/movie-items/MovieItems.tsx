import { GetMoviesResponse } from "../../services/movie.services";
import { Movie } from "../../shared/models/Movie";
import { MovieTile } from "../movie-tile/MovieTile";
import { useRouter } from "next/router";

export const MovieItems = ({
  moviesData,
}: {
  moviesData: GetMoviesResponse | undefined;
  onDetailsClick?: (movie: Movie) => void;
}) => {
  const router = useRouter();
  const movies = moviesData?.data || [];

  if (moviesData?.totalAmount === 0) {
    return (
      <div className="my-10 flex justify-center items-center">
        No movies found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 my-4">
      {moviesData?.totalAmount && (
        <div>
          <strong>{moviesData?.totalAmount}</strong> movies found
        </div>
      )}
      <div className="flex flex-row gap-3 flex-wrap justify-between	items-center">
        {movies.map((movie) => (
          <MovieTile
            key={movie.id}
            movie={movie}
            onMovieClick={(movie) => router.push(`/${movie.id}`)}
          />
        ))}
        {movies.length % 3 === 2 && <div className="w-72"></div>}
      </div>
    </div>
  );
};
