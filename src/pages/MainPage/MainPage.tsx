import { categoryLabels } from "@/common/constants"
import { Category } from "@/common/enums"
import { useGetMoviesByCategoryQuery } from "@/entities/movie/api/moviesApi"
import { HeroSection, MoviesSection } from "@/widgets"
import { useEffect, useState } from "react"
import s from "./MainPage.module.css"

export const MainPage = () => {
    const { data: popularData, isLoading } = useGetMoviesByCategoryQuery({ category: Category.popular })

    const [heroMovieBackdrop, setHeroMovieBackdrop] = useState<string | null>(
        popularData?.results[0]?.backdrop_path ?? null,
    )

    useEffect(() => {
        const results = popularData?.results
        if (results && results.length > 0) {
            const randomIndex = Math.floor(Math.random() * results.length)
            setHeroMovieBackdrop(results[randomIndex].backdrop_path)
        }
    }, [popularData])

    return (
        <section className={s.mainPage}>
            <HeroSection backdrop_path={heroMovieBackdrop} isLoading={isLoading} />
            <div className={s.wrapper}>
                {Object.values(Category).map((category) => (
                    <MoviesSection key={category} category={category} title={categoryLabels[category]} />
                ))}
            </div>
        </section>
    )
}
