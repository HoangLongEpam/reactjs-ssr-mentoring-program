import { Movie } from "../../shared/models/Movie";
import { MultiSelect } from "../../libs/multi-select/MultiSelect";
import { MovieGenreOptions } from "../../shared/constants/MovieGerneOptions";
import { Field, Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMovie, updateMovie } from "../../services/movie.services";
import { API_QUERY_KEY } from "../../shared/constants/ApiQueryKey";
import { useResetMovieList } from "../../hooks/useResetMovieList";

export interface MovieFormProps {
  movie?: Movie;
  onFinish?: (movie: Movie) => void;
  isDisabled?: boolean;
}

export const MovieForm: React.FC<MovieFormProps> = ({ movie, onFinish }) => {
  const queryClient = useQueryClient();
  const { reset: resetMovies } = useResetMovieList();

  const { mutate: updateMovieMutate, isPending: isPendingUpdate } = useMutation(
    {
      mutationFn: updateMovie,
      onSuccess: (data) => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: [API_QUERY_KEY.GET_MOVIE_BY_ID, data.id.toString()],
          }),

          resetMovies(),
        ]);
        onFinish?.(data);
      },
    }
  );

  const { mutate: addMovieMutate, isPending: isPendingAdd } = useMutation({
    mutationFn: addMovie,
    onSuccess: (data) => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [API_QUERY_KEY.GET_MOVIE_BY_ID, data.id.toString()],
        }),

        resetMovies(),
      ]);
      onFinish?.(data);
    },
  });

  return (
    <Formik
      initialValues={{
        title: movie?.title || "",
        release_date: movie?.release_date || "",
        poster_path: movie?.poster_path || "",
        vote_average: movie?.vote_average || 0,
        runtime: movie?.runtime || 0,
        genres: movie?.genres || null,
        overview: movie?.overview || "",
      }}
      enableReinitialize
      validate={(values) => {
        const errors: {
          title?: string;
          genres?: string;
          overview?: string;
          poster_path?: string;
          release_date?: string;
          runtime?: string;
          vote_average?: string;
        } = {};

        if (!values.title) {
          errors.title = "Missing title";
        }

        if (!values.genres) {
          errors.genres = "Missing genres";
        }

        if (!values.overview) {
          errors.overview = "Missing overview";
        }

        if (!values.poster_path) {
          errors.poster_path = "Missing Movie URL";
        }

        if (!values.release_date) {
          errors.release_date = "Missing Release Date";
        }

        if (!values.runtime) {
          errors.runtime = "Missing Runtime";
        }

        if (!values.vote_average) {
          errors.vote_average = "Missing Rating";
        }

        return errors;
      }}
      onSubmit={(values) => {
        const params = {
          ...movie,
          ...values,
          tagline: movie?.tagline || "No tagline",
        } as unknown as Movie;

        if (movie) {
          return updateMovieMutate(params);
        }

        return addMovieMutate(params);
      }}
    >
      {({ handleChange, resetForm, values, errors }) => (
        <Form className="text-black grid grid-cols-5 gap-x-6 gap-y-4 z-auto">
          {Object.keys(errors).length > 0 && (
            <div className="col-span-3 flex flex-col gap-2 text-red-400">
              Please fill all fields
            </div>
          )}
          <div className="col-span-3 flex flex-col gap-2">
            <label htmlFor="title" className="text-red-400 uppercase text-sm">
              Title
            </label>
            <Field
              id="title"
              name="title"
              placeholder="Movie Title"
              className="px-2 py-1 h-[38px] w-full bg-gray-600 rounded-sm text-white"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <label
              htmlFor="release_date"
              className="text-red-400 uppercase text-sm"
            >
              Release Date
            </label>
            <Field
              id="release_date"
              name="release_date"
              type="date"
              className="px-2 py-1 h-[38px] w-full bg-gray-600 rounded-sm text-white"
            />
          </div>
          <div className="col-span-3 flex flex-col gap-2">
            <label
              htmlFor="poster_path"
              className="text-red-400 uppercase text-sm"
            >
              Movie URL
            </label>
            <Field
              id="poster_path"
              name="poster_path"
              type="url"
              placeholder="https://"
              className="px-2 py-1 h-[38px] w-full bg-gray-600 rounded-sm text-white"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <label
              htmlFor="vote_average"
              className="text-red-400 uppercase text-sm"
            >
              Rating
            </label>
            <Field
              id="vote_average"
              name="vote_average"
              type="number"
              placeholder="7.8"
              className="px-2 py-1 h-[38px] w-full bg-gray-600 rounded-sm text-white"
            />
          </div>
          <div className="col-span-3 flex flex-col gap-2">
            <label htmlFor="genres" className="text-red-400 uppercase text-sm">
              Genres
            </label>

            <MultiSelect
              id="genres"
              options={MovieGenreOptions}
              onValueSelect={handleChange}
              value={values.genres}
              name="genres"
            />
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <label htmlFor="runtime" className="text-red-400 uppercase text-sm">
              Runtime
            </label>
            <Field
              id="runtime"
              name="runtime"
              type="number"
              placeholder="Minutes"
              className="px-2 py-1 h-[38px] w-full bg-gray-600 rounded-sm text-white"
            />
          </div>
          <div className="col-span-5">
            <label
              htmlFor="overview"
              className="text-red-400 uppercase text-sm"
            >
              Overview
            </label>
            <Field
              as="textarea"
              id="overview"
              name="overview"
              placeholder="Movie Overview"
              rows={5}
              className="px-2 py-1 w-full bg-gray-600 rounded-sm text-white"
            />
          </div>
          <div className="col-span-5 flex gap-2 justify-end">
            <button
              className="border rounded border-red-400 text-red-400 bg-transparent px-6 py-1 uppercase"
              onClick={() => resetForm()}
            >
              Reset
            </button>
            <button
              className="rounded text-white bg-red-400 px-6 py-1 uppercase disabled:cursor-not-allowed disabled:bg-gray-6"
              type="submit"
              disabled={isPendingAdd || isPendingUpdate}
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
