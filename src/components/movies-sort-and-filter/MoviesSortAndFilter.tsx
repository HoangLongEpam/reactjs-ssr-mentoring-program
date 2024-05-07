import { GENRES } from "../../shared/constants/Genres";
import { SortControlOptions } from "../../shared/constants/SortControlOptions";
import GenreSelect from "../genre-select/GenreSelect";
import { SortControl } from "../sort-control/SortControl";

export interface MovieSortAndFilterProps {
  filter: string;
  onFilter: (filter: string) => void;
  sortBy: SortControlOptions;
  onSortBy: (sort: SortControlOptions) => void;
}
export const MovieSortAndFilter = ({
  filter,
  onFilter,
  sortBy,
  onSortBy,
}: MovieSortAndFilterProps) => {
  return (
    <div className="flex flex-row justify-between items-center mt-8">
      <GenreSelect
        genres={GENRES}
        selectedGenre={filter}
        onSelect={(genre) => onFilter(genre)}
      />
      <SortControl
        currentSort={sortBy}
        onSortChange={(sort) => onSortBy(sort)}
      />
    </div>
  );
};