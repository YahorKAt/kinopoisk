import { ArrowRightIcon } from "@/common/components/Icons"
import type { CategoryType } from "@/common/enums"
import { Path } from "@/common/routing/paths"
import { useGetMoviesByCategoryQuery } from "@/entities/movie/api/moviesApi"
import { MovieCardSkeleton } from "@/entities/movie/ui"
import { MoviesList } from "@/widgets"
import s from "./MoviesSection.module.css"
import { NavLink } from "react-router-dom"

type Props = {
    title: string
    category: CategoryType
}
export const MoviesSection = ({ title, category }: Props) => {
    const { data, isLoading, error } = useGetMoviesByCategoryQuery({ category })

    if (error) return <div>Error loading movies</div>

    const movies = data?.results.slice(0, 6) ?? []

    if (isLoading) {
        return (
            <section className={s.section}>
                <div className={s.header}>
                    <h2 className={s.moviesListTitle}>{title}</h2>
                    <NavLink to={`${Path.Category}/${category}`} className={s.viewMoreButton}>
                        View more
                        <ArrowRightIcon />
                    </NavLink>
                </div>
                <div className={s.grid}>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <MovieCardSkeleton key={index} />
                    ))}
                </div>
            </section>
        )
    }

    return (
        <div className={s.section}>
            <div className={s.header}>
                <h2 className={s.moviesListTitle}>{title}</h2>
                <NavLink to={`${Path.Category}/${category}`} className={s.viewMoreButton}>
                    View more
                    <ArrowRightIcon />
                </NavLink>
            </div>
            <MoviesList movies={movies}   />
        </div>
    )
}
