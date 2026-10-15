// Типы ответов от TMDB
import { type CategoryType } from "@/common/enums"

export interface Movie {
    adult: boolean
    backdrop_path: string | null
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string | null
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface Genre {
    id: number
    name: string
}

export interface ProductionCompany {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
}

export interface ProductionCountries {
    iso_3166_1: string
    name: string
}

export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

export interface MovieDetails extends Movie {
    belongs_to_collection: {
        id: number
        name: string
        poster_path: string | null
        backdrop_path: string | null
    } | null
    budget: number
    genres: Genre[]
    homepage: string | null
    imdb_id: string | null
    origin_country: string[]
    production_companies: ProductionCompany[]
    production_countries: ProductionCountries[]
    revenue: number
    runtime: number | null
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string | null
}

export interface Crew {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string | null
    credit_id: string
    department: string
    jod: string
}

export interface CastMember {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}

export interface CreditsResponse {
    id: number
    cast: CastMember[]
    crew: Crew[]
}

export interface MoviesResponse {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
}

// Тип аргументов запроса
export type GetMoviesArgs = {
    category: CategoryType
    language?: string
    page?: number
    region?: string
}

export interface Genre {
    id: number
    name: string
}

export type GenreListResponse = {
    genres: Genre[]
}



export type GetFilteredMoviesArgs = {
    page?: number
    language?: string
    sort_by?: string // например: 'popularity.desc', 'vote_average.desc', 'primary_release_date.desc'
    with_genres?: string // строка с ID жанров через запятую, например: '28,12' (Action, Adventure)
    primary_release_year?: number // например: 2023
    "vote_average.gte"?: number // минимальный рейтинг (gte = greater than or equal)
    "vote_average.lte"?: number // максимальный рейтинг (lte = less than or equal)
    region?: string // например: 'US', 'RU'
}
