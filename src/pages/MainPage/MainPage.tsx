import { Category } from "@/common/enums"
import {useGetMoviesByCategoryQuery} from "@/entities/movie/api/moviesApi";
import {HeroSection, MoviesSection} from "@/widgets";
import {useEffect, useState} from "react";
import s from './MainPage.module.css'

export const categories = [
    { title: "Popular Movies", category: Category.popular },
    { title: "Top Rated Movies", category: Category.top_rated },
    { title: "Upcoming Movies", category: Category.upcoming },
    { title: "Now Playing Movies", category: Category.now_playing },
]

export const MainPage = () => {
    const { data: popularData } = useGetMoviesByCategoryQuery({ category: Category.popular })
    const movies = popularData?.results ?? [];

    const [heroMovieBackdrop, setHeroMovieBackdrop] = useState<string | null>(
        movies[0]?.backdrop_path ?? null
    );

    useEffect(() => {
        if (movies.length > 0) {
            const randomIndex = Math.floor(Math.random() * movies.length);
            setHeroMovieBackdrop(movies[randomIndex].backdrop_path);
        }
    }, [popularData]);

    return (
        <section className={s.mainPage}>
            <HeroSection backdrop_path={heroMovieBackdrop}/>
            <div className={s.wrapper}>
                {categories.map(c => (
                    <MoviesSection key={c.category} category={c.category} title={c.title}/>
                ))}
            </div>

        </section>
    )
}