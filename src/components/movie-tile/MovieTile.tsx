import React from "react";
import { Movie } from "../../shared/models/Movie";
import { ImageWithFallback } from "../image/Image";

export interface MovieTileProps {
  /**
   * Movie tile to be displayed
   **/
  movie: Movie;
  /**
   * Callback to be called when the user clicks on the movie
   **/
  onMovieClick?: (movie: Movie) => void;
  /**
   * Callback to be called when the user clicks on the edit button
   **/
  onEditClick?: (movie: Movie) => void;
  /**
   * Callback to be called when the user clicks on the delete button
   **/
  onDeleteClick?: (movie: Movie) => void;
}

export const MovieTile = ({
  movie,
  onMovieClick,
  onEditClick,
  onDeleteClick,
}: MovieTileProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleOnDeleteClick = () => {
    onDeleteClick?.(movie);
    setIsMenuOpen(false);
  };

  const handleOnEditClick = () => {
    onEditClick?.(movie);
    setIsMenuOpen(false);
  };

  const openPopupMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setIsMenuOpen(true);
  };

  const popupMenu = () => (
    <div className="absolute top-4 right-4 w-28 py-2 text-sm flex flex-col gap-1 items-start bg-gray-800">
      <button
        className="py-1 px-4 hover:bg-red-400 w-full text-left"
        onClick={(event) => {
          event.stopPropagation(), handleOnEditClick();
        }}
      >
        Edit
      </button>
      <button
        className="py-1 px-4 hover:bg-red-400 w-full text-left"
        onClick={(event) => {
          event.stopPropagation(), handleOnDeleteClick();
        }}
      >
        Delete
      </button>
    </div>
  );

  return (
    <div className="w-72 cursor-pointer" onClick={() => onMovieClick?.(movie)}>
      <div className="w-72 aspect-auto relative">
        <ImageWithFallback src={movie?.poster_path} alt={movie?.title} />
        {!isMenuOpen && (
          <button
            onClick={(event) => openPopupMenu(event)}
            className="rounded-full w-8 aspect-square bg-gray-800 absolute top-0 right-0 mt-1 mr-1 opacity-0 hover:opacity-100"
          >
            <span role="img" aria-label="popup-menu">
              ⋮
            </span>
          </button>
        )}
        {isMenuOpen && popupMenu()}
      </div>
      <div className="flex flex-row justify-between items-center mt-4 text-white">
        <h3 className="text-lg text-gray-400">{movie?.title}</h3>
        <span className="border rounded py-1 px-4 text-sm">
          {movie?.release_date}
        </span>
      </div>
      <div className="mt-1 text-sm">
        {movie?.genres.map((genre, i) => (
          <span key={genre}>
            {genre + (i !== movie.genres.length - 1 ? ", " : "")}
          </span>
        ))}
      </div>
    </div>
  );
};
