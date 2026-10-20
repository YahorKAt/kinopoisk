import { baseApi } from "@/app/api/baseApi"
import { withZodValidate } from "@/common/utils"
import {
    creditsResponseSchema,
    genreListResponseSchema,
    movieDetailsSchema,
    movieResponseSchema,
} from "@/entities/movie/api/movieApi.schemas"
import {
    type CreditsResponse,
    type GenreListResponse,
    type GetFilteredMoviesArgs,
    type GetMoviesArgs,
    type GetSearchMoviesArgs,
    type MovieDetails,
    type MoviesResponse,
} from "@/entities/movie/api/movieApi.types"

export const movieApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMoviesByCategory: build.query<MoviesResponse, GetMoviesArgs>({
            query: ({ category, page = 1, region }) => ({
                url: `/movie/${category}`,
                params: {
                    page,
                    region,
                },
            }),
            providesTags: ["Movies"],
            ...withZodValidate(movieResponseSchema),
        }),

        getMovieDetails: build.query<MovieDetails, { movie_id: number }>({
            query: ({ movie_id }) => ({
                url: `/movie/${movie_id}`,
            }),
            providesTags: (_result, _error, { movie_id }) => [{ type: "Movies", movie_id }],
            ...withZodValidate(movieDetailsSchema),
        }),

        getMovieCredits: build.query<CreditsResponse, { movie_id: number }>({
            query: ({ movie_id }) => ({
                url: `/movie/${movie_id}/credits`,
            }),
            providesTags: (_result, _error, { movie_id }) => [{ type: "Cast", movie_id }],
            ...withZodValidate(creditsResponseSchema),
        }),

        getSimilarMovies: build.query<MoviesResponse, { movie_id: number; page?: number }>({
            query: ({ movie_id, page = 1 }) => ({
                url: `/movie/${movie_id}/similar`,
                params: {
                    page,
                },
            }),
            providesTags: (_result, _error, { movie_id }) => [{ type: "Similar", movie_id }],
            ...withZodValidate(movieResponseSchema),
        }),

        getGenreList: build.query<GenreListResponse, void>({
            query: () => "/genre/movie/list",
            providesTags: ["Genres"],
            ...withZodValidate(genreListResponseSchema),
        }),

        getFilteredMovies: build.query<MoviesResponse, GetFilteredMoviesArgs>({
            query: (args) => ({
                url: "/discover/movie",
                params: {
                    page: args.page ?? 1,
                    sort_by: args.sort_by,
                    with_genres: args.with_genres,
                    primary_release_year: args.primary_release_year,
                    "vote_average.gte": args["vote_average.gte"],
                    "vote_average.lte": args["vote_average.lte"],
                    region: args.region,
                },
            }),
            providesTags: ["Movies"],
            ...withZodValidate(movieResponseSchema),
        }),

        getSearchMovies: build.query<MoviesResponse, GetSearchMoviesArgs>({
            query: (args) => ({
                url: "/search/movie",
                params: {
                    query: args.query,
                    page: args.page ?? 1,
                    include_adult: args.include_adult ?? false,
                    primary_release_year: args.primary_release_year,
                    year: args.year,
                    region: args.region,
                },
            }),
            providesTags: ["Movies"],
            ...withZodValidate(movieResponseSchema),
        }),
    }),
})

export const {
    useGetMoviesByCategoryQuery,
    useGetMovieDetailsQuery,
    useGetSimilarMoviesQuery,
    useGetMovieCreditsQuery,
    useGetGenreListQuery,
    useGetFilteredMoviesQuery,
    useGetSearchMoviesQuery,
} = movieApi
