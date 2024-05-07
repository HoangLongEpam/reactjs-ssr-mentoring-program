import { SortControlOptions } from "../../shared/constants/SortControlOptions";

export interface SortControlProps {
  /**
   * The current sort option
   **/
  currentSort: SortControlOptions;
  /**
   * The function to call when the sort option changes
   **/
  onSortChange: (sort: SortControlOptions) => void;
}

export const SortControl = ({
  currentSort,
  onSortChange,
}: SortControlProps) => {
  return (
    <div className="flex flex-row gap-3 uppercase">
      <label className="text-gray-400">Sort By</label>
      <select
        className="bg-transparent focus:outline-none uppercase"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortControlOptions)}
      >
        <option value={SortControlOptions.ReleaseDate}>Release Date</option>
        <option value={SortControlOptions.Title}>Title</option>
      </select>
    </div>
  );
};
