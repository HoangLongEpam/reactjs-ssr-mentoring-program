import { useSearchParams } from "react-router-dom";
import { ParamsKeys } from "../pages/MovieListPage";
import { SortControlOptions } from "../shared/constants/SortControlOptions";
import { useQueryClient } from "@tanstack/react-query";
import { API_QUERY_KEY } from "../shared/constants/ApiQueryKey";

export const useResetMovieList = () => {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  const search = searchParams.get(ParamsKeys.QUERY) || "";

  const sortBy =
    (searchParams.get(ParamsKeys.SORT_BY) as SortControlOptions) ||
    SortControlOptions.ReleaseDate;

  const filter = searchParams.get(ParamsKeys.GENRE) || "";

  const reset = () => {
    queryClient.invalidateQueries({
      queryKey: [API_QUERY_KEY.GET_MOVIES, { search, sortBy, filter }],
    });
  };

  return {
    reset,
  };
};
