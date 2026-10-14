import s from "./LinearProgress.module.css"

type Props = {
    isLoading?: boolean
}

export const LinearProgress = ({ isLoading = false }: Props) => {
    return (
        <div className={`${s.container} ${!isLoading ? s.hidden : ""}`} role="progressbar" aria-label="Loading">
            <div className={s.bar} />
        </div>
    )
}
