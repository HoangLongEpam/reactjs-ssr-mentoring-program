import { useDuration } from "../../hooks/useDuration";
import { Movie } from "../../shared/models/Movie";

export interface MovieDetailsProps {
  /**
   * Movie to be displayed
   **/
  movie: Movie;
}

export const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const { d } = useDuration();
  const duration = d(movie.runtime);
  return (
    <div className="flex flex-row gap-10 px-4">
      <div className="w-full">
        <img
          className="w-72 aspect-auto"
          src={movie.poster_path}
          alt={movie.title}
        />
      </div>
      <div>
        <div className="flex flex-row gap-10 items-center">
          <h2 className="text-4xl">{movie.title}</h2>
          <div className="rounded-full w-14 aspect-square border-white border flex items-center justify-center">
            {movie.vote_average}
          </div>
        </div>
        <div className="text-sm mt-2">
          {movie?.genres.map((genre, i) => (
            <span key={genre}>
              {genre + (i !== movie.genres.length - 1 ? ", " : "")}
            </span>
          ))}
        </div>
        <div className="flex flex-row gap-10 text-red-400 text-xl my-4">
          <p>{movie.release_date}</p>
          <p>{`${duration.hours}h ${duration.minutes}min`}</p>
        </div>
        <div className="text-lg">{movie.overview}</div>
      </div>
    </div>
  );
};
