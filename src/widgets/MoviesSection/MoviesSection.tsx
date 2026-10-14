import {ArrowRightIcon} from "@/common/components/Icons";
import {Path} from "@/common/routing/paths";
import {useGetMoviesByCategoryQuery} from "@/entities/movie/api/moviesApi";
import type { Category } from "@/entities/movie/api/moviesApi.types"
import {MoviesList} from "@/widgets";
import s from './MoviesSection.module.css'
import {NavLink} from "react-router-dom";

type Props = {
    title: string
    category: Category
}
export const MoviesSection = ({title, category}: Props) => {
    const {data, isLoading, error} = useGetMoviesByCategoryQuery({category});

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading movies</div>;

    const movies = data?.results.slice(0, 6) ?? [];

    return (
        <div className={s.section}>
            <div className={s.header}>
                <h2 className={s.moviesListTitle}>{title}</h2>
                <NavLink to={`${Path.Category}/${category}`} className={s.viewMoreButton}>
                    View more
                    <ArrowRightIcon/>
                </NavLink>
            </div>
            <MoviesList movies={movies}/>
        </div>
    );
};