import { baseApi } from "@/app/api/baseApi"
import type {
    CreditsResponse,
    GenreListResponse,
    GetMoviesArgs,
    MovieDetails,
    MoviesResponse,
} from "@/entities/movie/api/moviesApi.types"

export const moviesApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMoviesByCategory: build.query<MoviesResponse, GetMoviesArgs>({
            query: ({ category, page = 1, language = "en-US", region }) => ({
                url: `/movie/${category}`,
                params: {
                    page,
                    language,
                    region,
                },
            }),
            providesTags: ["Movies"],
        }),

        getMovieDetails: build.query<MovieDetails, { movie_id: number }>({
            query: ({ movie_id }) => ({
                url: `/movie/${movie_id}`,
            }),
            providesTags: (_result, _error, { movie_id }) => [{ type: "Movies", movie_id }],
        }),

        getMovieCredits: build.query<CreditsResponse, { movie_id: number; language?: string }>({
            query: ({ movie_id, language = "en-US" }) => ({
                url: `/movie/${movie_id}/credits`,
                params: {
                    language,
                },
            }),
            providesTags: (_result, _error, { movie_id }) => [{ type: "Cast", movie_id }],
        }),

        getSimilarMovies: build.query<MoviesResponse, { movie_id: number; language?: string; page?: number }>({
            query: ({ movie_id, page = 1, language = "en-US" }) => ({
                url: `/movie/${movie_id}/similar`,
                params: {
                    page,
                    language,
                },
            }),
            providesTags: (_result, _error, { movie_id }) => [{ type: "Similar", movie_id }],
        }),

        getGenreList: build.query<GenreListResponse, { language?: string }>({
            query: ({ language = "en-US" }) => ({
                url: "/genre/movie/list",
                params: {
                    language,
                },
            }),
            providesTags: ["Genres"],
        }),
    }),
})

export const {
    useGetMoviesByCategoryQuery,
    useGetMovieDetailsQuery,
    useGetSimilarMoviesQuery,
    useGetMovieCreditsQuery,
    useGetGenreListQuery
} = moviesApi
