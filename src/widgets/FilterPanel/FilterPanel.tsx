import { RangeSlider } from "@/common/components/RangeSlider/RangeSlider"
import { useGetGenreListQuery } from "@/entities/movie/api/moviesApi"
import { useCallback } from "react"
import s from "./FilterPanel.module.css"

type SortOption = {
    value: string
    label: string
}

const sortOptions: SortOption[] = [
    { value: "popularity.desc", label: "Popularity ↓" },
    { value: "popularity.asc", label: "Popularity ↑" },
    { value: "vote_average.desc", label: "Rating ↓" },
    { value: "vote_average.asc", label: "Rating ↑" },
    { value: "primary_release_date.desc", label: "Release Date ↓" },
    { value: "primary_release_date.asc", label: "Release Date ↑" },
    { value: "original_title.asc", label: "Title A-Z" },
    { value: "original_title.desc", label: "Title Z-A" },
]

type FilterState = {
    sortBy: string
    ratingMin: number
    ratingMax: number
    selectedGenres: number[]
}

type Props = {
    filters: FilterState
    onFilterChange: (newFilters: FilterState) => void
}

export const FilterPanel = ({ filters, onFilterChange }: Props) => {
    const { data } = useGetGenreListQuery({})

    const handleGenreToggle = (genreId: number) => {
        const newGenres = filters.selectedGenres.includes(genreId)
            ? filters.selectedGenres.filter((id) => id !== genreId)
            : [...filters.selectedGenres, genreId]

        onFilterChange({ ...filters, selectedGenres: newGenres })
    }

    const handleReset = () => {
        onFilterChange({
            sortBy: "popularity.desc",
            ratingMin: 0,
            ratingMax: 10,
            selectedGenres: [],
        })
    }

    const handleRatingChange = useCallback(
        (newValues: { ratingMin: number; ratingMax: number }) => {
            onFilterChange({ ...filters, ratingMax: newValues.ratingMax, ratingMin: newValues.ratingMin })
        },
        [filters, onFilterChange],
    )

    return (
        <aside className={s.filterPanel}>
            <h2 className={s.title}>Filters / Sort</h2>

            {/* Sort by */}
            <div>
                <label className={s.label} htmlFor="sort-select">
                    Sort by
                </label>
                <select
                    id="sort-select"
                    className={s.select}
                    value={filters.sortBy}
                    onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Rating range */}
            <div>
                <div className={s.ratingHeader}>
                    <span className={s.label}>Rating</span>
                    <span className={s.ratingValue}>
                        {filters.ratingMin.toFixed(1)} - {filters.ratingMax.toFixed(1)}
                    </span>
                </div>
                <RangeSlider
                    ratingMin={filters.ratingMin}
                    ratingMax={filters.ratingMax}
                    onFilterChange={handleRatingChange}
                />
            </div>

            {/* Genres */}
            <div className={s.genresGrid}>
                {data?.genres.map((genre) => (
                    <button
                        key={genre.id}
                        className={`${s.genreButton} ${filters.selectedGenres.includes(genre.id) ? s.active : ""}`}
                        onClick={() => handleGenreToggle(genre.id)}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>

            {/* Reset button */}
            <button className={s.resetButton} onClick={handleReset}>
                Reset filters
            </button>
        </aside>
    )
}
