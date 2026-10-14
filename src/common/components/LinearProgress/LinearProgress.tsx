import s from "./LinearProgress.module.css"

export const LinearProgress = () => {
    return (
        <div className={s.container} role="progressbar" aria-label="Loading">
            <div className={s.bar} />
        </div>
    )
}
