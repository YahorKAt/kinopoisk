import { categoryLabels } from "@/common/constants"
import { Path } from "@/common/routing/paths"
import { useGetMoviesByCategoryQuery } from "@/entities/movie/api/movieApi"
import { MovieCardSkeleton } from "@/entities/movie/ui"
import { CategoryTabs, MoviesGrid, Pagination } from "@/widgets"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Category, type CategoryType } from "@/common/enums"
import { isValidCategoryType } from "@/common/utils"
import s from "./CategoryPage.module.css"

export const CategoryPage = () => {
    const { category } = useParams<{ category: string }>()
    const navigate = useNavigate()

    const isValidCategory = isValidCategoryType(category)
    const currentCategory: CategoryType = isValidCategory ? category : Category.popular

    const [currentPage, setCurrentPage] = useState(1)

    const { data, isLoading } = useGetMoviesByCategoryQuery({
        category: currentCategory,
        page: currentPage,
    })

    useEffect(() => {
        setCurrentPage(1)
    }, [currentCategory])

    useEffect(() => {
        if (category && !isValidCategory) {
            navigate(`${Path.Category}/${Category.popular}`, { replace: true })
        }
    }, [category, navigate, isValidCategory])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    if (isLoading) {
        return (
            <section className={s.categoryPage}>
                <CategoryTabs />
                <section className={s.moviesSection}>
                    <h2 className={s.title}>{categoryLabels[currentCategory]}</h2>
                    <div className={s.grid}>
                        {Array.from({ length: 15 }).map((_, index) => (
                            <MovieCardSkeleton key={index} />
                        ))}
                    </div>
                </section>
            </section>
        )
    }

    return (
        <section className={s.categoryPage}>
            <CategoryTabs />
            <section className={s.moviesSection}>
                <h2 className={s.title}>{categoryLabels[currentCategory]}</h2>

                {data?.results && data.results.length > 0 ? (
                    <MoviesGrid movies={data.results} />
                ) : (
                    <div>No movies found</div>
                )}

                {data && data.total_pages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={data.total_pages}
                        onPageChange={handlePageChange}
                    />
                )}
            </section>
        </section>
    )
}
