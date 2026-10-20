import { useGetSearchMoviesQuery } from "@/entities/movie/api/movieApi"
import { MovieCardSkeleton } from "@/entities/movie/ui"
import { Search } from "@/features"
import { MoviesGrid, Pagination } from "@/widgets"
import { useSearchParams } from "react-router-dom"
import s from "./SearchPage.module.css"

export const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get("query") || ""
    const page = Number(searchParams.get("page")) || 1

    const { data, isLoading } = useGetSearchMoviesQuery({ query, page }, { skip: !query })

    const handleSearch = (newQuery: string) => {
        setSearchParams(newQuery ? { query: newQuery, page: "1" } : {})
    }

    const handlePageChange = (newPage: number) => {
        setSearchParams((prev) => {
            prev.set("page", String(newPage))
            return prev
        })
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Начальное состояние (нет запроса)
    if (!query) {
        return (
            <section className={s.container}>
                <h1 className={s.title}>Search Movies</h1>
                <Search onSearch={handleSearch} />
                <p className={s.empty}>Enter a movie title to start searching.</p>
            </section>
        )
    }

    // Состояние загрузки
    if (isLoading) {
        return (
            <section className={s.container}>
                <h1 className={s.title}>Search Results</h1>
                <Search onSearch={handleSearch} />
                <div className={s.grid}>
                    {Array.from({ length: 15 }, (_, i) => (
                        <MovieCardSkeleton key={i} />
                    ))}
                </div>
            </section>
        )
    }

    const hasResults = data?.results?.length

    return (
        <section className={s.container}>
            <h1 className={s.title}>Search Results</h1>
            <Search onSearch={handleSearch} />

            {hasResults ? (
                <>
                    <p className={s.subtitle}>Results for "{query}"</p>
                    <MoviesGrid movies={data.results} />
                    {data.total_pages > 1 && (
                        <Pagination currentPage={page} totalPages={data.total_pages} onPageChange={handlePageChange} />
                    )}
                </>
            ) : (
                <p className={s.subtitle}>No matches found for "{query}"</p>
            )}
        </section>
    )
}
