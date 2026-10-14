import { Category, type CategoryType } from "@/common/enums"

export const THEME = "theme"
export const FAVORITES = "favorites"

export const categoryLabels: Record<CategoryType, string> = {
    [Category.popular]: "Popular Movies",
    [Category.top_rated]: "Top Rated Movies",
    [Category.upcoming]: "Upcoming Movies",
    [Category.now_playing]: "Now Playing Movies",
}