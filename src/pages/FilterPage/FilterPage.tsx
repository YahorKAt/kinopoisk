import { useDebounceValue } from "@/common/hooks"
import { useGetFilteredMoviesQuery } from "@/entities/movie/api/movieApi"
import { MovieCardSkeleton } from "@/entities/movie/ui"
import { FilterPanel, MoviesGrid, Pagination } from "@/widgets"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import s from "./FilterPage.module.css"

const DEFAULT_URL_PARAMS = {
    sort: "popularity.desc",
    ratingMin: "0",
    ratingMax: "10",
    genres: [],
    page: "1",
}

export const FilterPage = () => {
    const [searchParams, setSearchParams] = useSearchParams(DEFAULT_URL_PARAMS)

    const filters = useMemo(
        () => ({
            sortBy: searchParams.get("sort") || DEFAULT_URL_PARAMS.sort,
            ratingMin: Number(searchParams.get("ratingMin") || DEFAULT_URL_PARAMS.ratingMin),
            ratingMax: Number(searchParams.get("ratingMax") || DEFAULT_URL_PARAMS.ratingMax),
            selectedGenres: searchParams.get("genres")
                ? searchParams.get("genres")!.split(",").map(Number)
                : DEFAULT_URL_PARAMS.genres,
        }),
        [searchParams],
    )

    const debouncedRatingMin = Number(useDebounceValue(filters.ratingMin))
    const debouncedRatingMax = Number(useDebounceValue(filters.ratingMax))

    const currentPage = Number(searchParams.get("page")) || 1

    const apiArgs = useMemo(
        () => ({
            page: currentPage,
            sort_by: filters.sortBy,
            with_genres: filters.selectedGenres.length > 0 ? filters.selectedGenres.join(",") : undefined,
            "vote_average.gte": debouncedRatingMin > 0 ? debouncedRatingMin : undefined,
            "vote_average.lte": debouncedRatingMax < 10 ? debouncedRatingMax : undefined,
        }),
        [filters, currentPage, debouncedRatingMin, debouncedRatingMax],
    )

    const { data, isLoading } = useGetFilteredMoviesQuery(apiArgs)

    const handleFilterChange = (newFilters: typeof filters) => {
        setSearchParams({
            sort: newFilters.sortBy,
            ratingMin: String(newFilters.ratingMin),
            ratingMax: String(newFilters.ratingMax),
            genres: newFilters.selectedGenres.join(","),
            page: "1", // Сброс страницы при смене фильтров
        })
    }

    const handlePageChange = (page: number) => {
        setSearchParams((prev) => {
            prev.set("page", String(page))
            return prev
        })
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <section className={s.filterPage}>
            <div className={s.content}>
                <div className={s.filterColumn}>
                    <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
                </div>

                <div className={s.moviesColumn}>
                    <section className={s.wrapper}>
                        {isLoading ? (
                            <div className={s.grid}>
                                {Array.from({ length: 15 }).map((_, index) => (
                                    <MovieCardSkeleton key={index} />
                                ))}
                            </div>
                        ) : (
                            <div className={s.body}>
                                {data?.results ? <MoviesGrid movies={data.results} /> : <p>Фильмы не найдены</p>}

                                {data && data.total_pages > 1 && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={data.total_pages}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </section>
    )
}
