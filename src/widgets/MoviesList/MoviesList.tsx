import type { Movie } from "@/entities/movie/api/moviesApi.types"
import { MovieCard } from "@/entities/movie/ui"
import s from "./MoviesList.module.css"

type Props = {
    movies: Movie[]
}

export const MoviesList = ({ movies }: Props) => {
    return (
        <section className={s.section}>
            <div className={s.grid}>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        vote_average={movie.vote_average}
                        poster_path={movie.poster_path}
                    />
                ))}
            </div>
        </section>
    )
}
