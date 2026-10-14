import { LikeIcon } from "@/common/components/Icons"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { Path } from "@/common/routing/paths"
import { getRatingColorVar } from "@/common/utils/rating"
import { selectIsFavorite, toggleFavorite } from "@/entities/movie/model/movieSlice"
import { NavLink } from "react-router-dom"
import s from "./MovieCard.module.css"

type Props = {
    id: number
    title: string
    poster_path: string | null
    vote_average: number
}

export const MovieCard = ({ id, title, poster_path, vote_average }: Props) => {
    const dispatch = useAppDispatch()
    const isFavorite = useAppSelector((state) => selectIsFavorite(state, id))

    const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w185${poster_path}` : null
    const ratingColor = getRatingColorVar(vote_average)

    const changeFavoriteStatusHandler = () => {
        dispatch(toggleFavorite({ id, title, poster_path, vote_average }))
    }

    return (
        <article className={s.cardMovie}>
            <div className={s.poster}>
                <NavLink to={`${Path.Movie}/${id}`} className={s.posterLink}>
                    {posterUrl ? (
                        <img className={s.posterImage} src={posterUrl} alt={title} loading="lazy" />
                    ) : (
                        <div className={s.placeholder}>No Poster</div>
                    )}
                    <span className={s.rating} style={{ backgroundColor: ratingColor }}>
                        {vote_average.toFixed(1)}
                    </span>
                </NavLink>
                <button
                    className={`${s.favoriteButton} ${isFavorite ? s.active : ""}`}
                    onClick={changeFavoriteStatusHandler}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    <LikeIcon isFilled={isFavorite} />
                </button>
            </div>
            <NavLink to={`movie/${id}`} className={s.cardTitleLink}>
                <h3 className={s.cardTitle}>{title}</h3>
            </NavLink>
        </article>
    )
}
