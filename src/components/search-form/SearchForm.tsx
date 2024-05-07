import React from "react";
interface SearchFormProps {
  /**
   * Initial search query
   */
  initialSearchQuery?: string;
  /**
   * Callback to be called when the user submits the search form
   */
  onSearch: (searchQuery: string) => void;
}

function SearchForm({ initialSearchQuery, onSearch }: SearchFormProps) {
  const [searchQuery, setSearchQuery] = React.useState(
    initialSearchQuery || ""
  );

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        className="rounded-sm w-96 p-2 bg-stone-900 text-white focus:outline-none focus:ring-none"
        type="text"
        placeholder="What do you want to watch ?"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="py-2 px-10 rounded-sm bg-netflix-red uppercase text-white"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchForm;
