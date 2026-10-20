import type {Movie} from "@/entities/movie/api/movieApi.types";
import { MovieCard } from "@/entities/movie/ui"

import s from './MoviesGrid.module.css'

type Props = {
    movies: Movie[]
}

export const MoviesGrid = ({movies}: Props) => {
    return (
        <div className={s.grid}>
            {movies.map((movie) => (
                <MovieCard key={movie.id}
                           id={movie.id}
                           title={movie.title}
                           vote_average={movie.vote_average}
                           poster_path={movie.poster_path}
                />
            ))}
        </div>
    );
};