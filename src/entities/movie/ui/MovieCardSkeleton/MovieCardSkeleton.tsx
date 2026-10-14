import s from "./MovieCardSkeleton.module.css"

export const MovieCardSkeleton = () => {
    return (
        <article className={s.cardMovie}>
            <div className={`${s.skeleton} ${s.skeletonPoster}`} />
            <h3 className={`${s.skeleton} ${s.skeletonTitle}`} />
        </article>
    )
}
