import { MovieDetails } from "@/components/movie-details/MovieDetails";
import { getMovieById } from "@/services/movie.services";
import { API_QUERY_KEY } from "@/shared/constants/ApiQueryKey";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const movieId = (context.params?.slug?.[0] as string) || "";

  if (!movieId) {
    return {
      notFound: true,
    };
  }

  await queryClient.prefetchQuery({
    queryKey: [API_QUERY_KEY.GET_MOVIE_BY_ID, movieId],
    queryFn: () => getMovieById(movieId),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function MovieDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const movieId = slug?.[0];

  const { data: movie, error } = useQuery({
    queryKey: [API_QUERY_KEY.GET_MOVIE_BY_ID, movieId],
    queryFn: () => getMovieById(movieId as string),
  });

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-row justify-between items-center">
        <label className="text-netflix-red">
          <span className="font-extrabold text-lg">Netflix</span>roulette
        </label>
        <button
          className="bg-transparent text-netflix-red py-2 px-6 text-sm"
          onClick={() => router.push("/")}
        >
          Search
        </button>
      </div>
      <div className="px-20">
        {movie ? <MovieDetails movie={movie} /> : <h2>No movie found</h2>}
      </div>
    </div>
  );
}
