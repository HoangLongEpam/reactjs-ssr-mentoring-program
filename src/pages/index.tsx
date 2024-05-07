import Image from "next/image";
import { Inter } from "next/font/google";
import { GetServerSidePropsContext } from "next";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { API_QUERY_KEY } from "@/shared/constants/ApiQueryKey";
import { getMovies } from "@/services/movie.services";
import { MovieItems } from "@/components/movie-items/MovieItems";
import { SortControlOptions } from "@/shared/constants/SortControlOptions";
import { useRouter } from "next/router";
import { MovieSortAndFilter } from "@/components/movies-sort-and-filter/MoviesSortAndFilter";
import { ParamsKeys } from "@/shared/constants/MovieListParamsKeys";
import SearchForm from "@/components/search-form/SearchForm";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const search = (context.query.query as string) || "";
  const sortBy =
    (context.query.sortBy as SortControlOptions) ||
    SortControlOptions.ReleaseDate;
  const filter = (context.query.genre as string) || "";

  await queryClient.prefetchQuery({
    queryKey: [API_QUERY_KEY.GET_MOVIES, { search, sortBy, filter }],
    queryFn: () =>
      getMovies({
        search,
        sortBy,
        sortOrder: SortControlOptions.ReleaseDate === sortBy ? "desc" : "asc",
        filter,
      }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const router = useRouter();

  const search = (router.query.query as string) || "";
  const sortBy =
    (router.query.sortBy as SortControlOptions) ||
    SortControlOptions.ReleaseDate;
  const filter = (router.query.genre as string) || "";

  const { data: movieData } = useQuery({
    queryKey: [API_QUERY_KEY.GET_MOVIES, { search, sortBy, filter }],
    queryFn: () =>
      getMovies({
        search,
        sortBy,
        sortOrder: SortControlOptions.ReleaseDate === sortBy ? "desc" : "asc",
        filter,
      }),
  });

  const updateSearchParams = (params: Record<string, string>) => {
    router.push({
      pathname: "/",
      query: {
        ...router.query,
        ...params,
      },
    });
  };
  return (
    <main className="w-full max-w-4xl m-auto">
      <div className="min-h-[400px] flex relative">
        <div className="bg-hero-image blur-md w-full h-full absolute"></div>
        <div className="z-10 w-full py-8 px-16">
          <div className="flex flex-row justify-between items-center">
            <label className="text-netflix-red">
              <span className="font-extrabold text-lg">Netflix</span>roulette
            </label>
            {/* <button
              className="bg-netflix-gray-1 text-netflix-red py-2 px-6 text-sm"
              onClick={() => preserveNavigate("new")}
            >
              + ADD MOVIE
            </button> */}
          </div>
          <h2 className="text-4xl font-light my-14 mx-20">FIND YOUR MOVIE</h2>
          <div className="mx-20">
            <SearchForm
              initialSearchQuery={search}
              onSearch={(searchQuery) =>
                updateSearchParams({
                  [ParamsKeys.QUERY]: searchQuery,
                })
              }
            />
          </div>
        </div>
      </div>
      <MovieSortAndFilter
        filter={filter}
        onFilter={(filter) =>
          updateSearchParams({ [ParamsKeys.GENRE]: filter })
        }
        sortBy={sortBy}
        onSortBy={(sortBy) =>
          updateSearchParams({ [ParamsKeys.SORT_BY]: sortBy })
        }
      />
      <MovieItems moviesData={movieData} />
    </main>
  );
}
