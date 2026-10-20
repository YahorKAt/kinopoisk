import { type CategoryType } from "@/common/enums"
import { movieSchema } from "@/common/schemas"
import {
    creditsResponseSchema,
    type genreListResponseSchema,
    movieDetailsSchema,
    movieResponseSchema,
} from "@/entities/movie/api/movieApi.schemas"
import * as z from "zod"

export type Movie = z.infer<typeof movieSchema>

export type MoviesResponse = z.infer<typeof movieResponseSchema>
export type CreditsResponse = z.infer<typeof creditsResponseSchema>
export type GenreListResponse = z.infer<typeof genreListResponseSchema>
export type MovieDetails = z.infer<typeof movieDetailsSchema>

// Тип аргументов запроса
export type GetMoviesArgs = {
    category: CategoryType
    language?: string
    page?: number
    region?: string
}

export type GetFilteredMoviesArgs = {
    page?: number
    language?: string
    sort_by?: string
    with_genres?: string
    primary_release_year?: number
    "vote_average.gte"?: number
    "vote_average.lte"?: number
    region?: string
}

export type GetSearchMoviesArgs = {
    query: string
    include_adult?: boolean
    language?: string
    primary_release_year?: string
    page?: number
    region?: string
    year?: string
}
