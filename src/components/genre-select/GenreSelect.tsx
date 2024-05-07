interface GenreSelectProps {
  /**
   * List of genres
   */
  genres: { name: string; value: string }[];
  /**
   * Selected genre
   */
  selectedGenre: string;
  /**
   * Callback when a genre is selected
   */
  onSelect: (genre: string) => void;
}

function GenreSelect({ genres, selectedGenre, onSelect }: GenreSelectProps) {
  return (
    <div className="genre-select">
      {genres.map((genre) => (
        <button
          key={genre.name}
          className={`py-2 px-4 border-b-2 border-netflix-gray-2 ${
            genre.value === selectedGenre && "border-netflix-red"
          }`}
          onClick={() => onSelect(genre.value)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default GenreSelect;
