import { ArrowLeftIcon } from "@/common/components/Icons"
import { getRatingColorVar } from "@/common/utils/rating"
import {
    useGetMovieCreditsQuery,
    useGetMovieDetailsQuery,
    useGetSimilarMoviesQuery,
} from "@/entities/movie/api/moviesApi"
import { MoviesList } from "@/widgets"
import { useParams, useNavigate } from "react-router-dom"
import s from "./MoviePage.module.css"

export const MoviePage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { data: movie, isLoading: isLoadingMovie } = useGetMovieDetailsQuery({ movie_id: Number(id) })
    const { data: credits } = useGetMovieCreditsQuery({ movie_id: Number(id) })
    const { data: similarMovies } = useGetSimilarMoviesQuery({ movie_id: Number(id) })

    if (isLoadingMovie) return <div className={s.loading}>Loading...</div>
    if (!movie) return <div className={s.error}>Movie not found</div>

    const posterUrl = movie.poster_path ? `http://image.tmdb.org/t/p/w342${movie.poster_path}` : null
    const ratingColor = getRatingColorVar(movie.vote_average)
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"
    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A"
    const actors = credits?.cast.slice(0, 6) ?? []
    const similarMovieList = similarMovies?.results.slice(0, 6) ?? []

    return (
        <section className={s.moviePage}>
            {/* Верхняя секция: постер + информация */}
            <div className={s.topSection}>
                <div className={s.posterContainer}>
                    {posterUrl ? (
                        <img src={posterUrl} alt={movie.title} className={s.poster} />
                    ) : (
                        <div className={s.posterPlaceholder}>No Poster</div>
                    )}
                </div>

                <div className={s.movieInfo}>
                    <header className={s.header}>
                        <div className={s.topBlock}>
                            <h1 className={s.title}>{movie.title}</h1>
                            <button className={s.backButton} onClick={() => navigate(-1)}>
                                <ArrowLeftIcon /> Back
                            </button>
                        </div>

                        <div className={s.metaBlock}>
                            <span className={s.metaItem}>Release year: {releaseYear}</span>
                            <span className={s.rating} style={{ backgroundColor: ratingColor }}>
                                {movie.vote_average.toFixed(1)}
                            </span>
                            <span className={s.metaItem}>Runtime: {runtime}</span>
                        </div>
                    </header>

                    <p className={s.overview}>{movie.overview}</p>

                    {movie.genres && movie.genres.length > 0 && (
                        <div className={s.genresSection}>
                            <h3 className={s.sectionTitle}>Genres</h3>
                            <ul className={s.genresList}>
                                {movie.genres.map((genre) => (
                                    <li key={genre.id} className={s.genreTag}>
                                        {genre.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Секция актёров */}
            {actors.length > 0 ? (
                <section className={s.section}>
                    <h2 className={s.sectionTitle}>Cast</h2>
                    <div className={s.castGrid}>
                        {actors.slice(0, 12).map((actor) => {
                            const profileUrl = actor.profile_path
                                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                : null
                            return (
                                <article key={actor.id} className={s.castCard}>
                                    <div className={s.castPhoto}>
                                        {profileUrl ? (
                                            <img src={profileUrl} alt={actor.name} />
                                        ) : (
                                            <div className={s.castPlaceholder}>No photo</div>
                                        )}
                                    </div>
                                    <div className={s.castInfo}>
                                        <p className={s.castName}>{actor.name}</p>
                                        <p className={s.castCharacter}>{actor.character}</p>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </section>
            ) : (
                <div>No actors!</div>
            )}
            {/* Секция похожих фильмов */}

            <div className={s.section}>
                <h2 className={s.sectionTitle}>Similar Movies</h2>
                {similarMovieList.length > 0 ? <MoviesList movies={similarMovieList} /> : <div>No similar movies</div>}
            </div>
        </section>
    )
}
