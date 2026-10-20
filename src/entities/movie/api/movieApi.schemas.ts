import {
    genreSchema,
    movieSchema,
    productionCompanySchema,
    productionCountrySchema,
    spokenLanguageSchema,
} from "@/common/schemas"
import * as z from "zod"

export const movieResponseSchema = z.object({
    page: z.number(),
    results: z.array(movieSchema),
    total_pages: z.number(),
    total_results: z.number(),
})

export const genreListResponseSchema = z.object({
    genres: z.array(genreSchema),
})

export const crewSchema = z.object({
    adult: z.boolean(),
    gender: z.number(),
    id: z.number(),
    known_for_department: z.string(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number(),
    profile_path: z.string().nullable(),
    credit_id: z.string(),
    department: z.string(),
    job: z.string(),
})

export const castMemberSchema = z.object({
    adult: z.boolean(),
    gender: z.number(),
    id: z.number(),
    known_for_department: z.string(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number(),
    profile_path: z.string().nullable(),
    cast_id: z.number(),
    character: z.string(),
    credit_id: z.string(),
    order: z.number(),
})

export const creditsResponseSchema = z.object({
    id: z.number(),
    cast: z.array(castMemberSchema),
    crew: z.array(crewSchema),
})

export const movieDetailsSchema = movieSchema.extend({
    belongs_to_collection: z
        .object({
            id: z.number(),
            name: z.string(),
            poster_path: z.string().nullable(),
            backdrop_path: z.string().nullable(),
        })
        .nullable(),
    budget: z.number(),
    genres: z.array(genreSchema),
    homepage: z.string().nullable(),
    imdb_id: z.string().nullable(),
    origin_country: z.array(z.string()),
    production_companies: z.array(productionCompanySchema),
    production_countries: z.array(productionCountrySchema),
    revenue: z.number(),
    runtime: z.number().nullable(),
    spoken_languages: z.array(spokenLanguageSchema),
    status: z.string(),
    tagline: z.string().nullable(),
})