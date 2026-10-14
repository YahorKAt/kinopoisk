export const Category = {
    popular: "popular",
    top_rated: "top_rated",
    upcoming: "upcoming",
    now_playing: "now_playing",
} as const

export type CategoryType = (typeof Category)[keyof typeof Category]