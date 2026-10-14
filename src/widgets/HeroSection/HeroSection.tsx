import { Search } from "@/features"
import s from "./HeroSection.module.css"

type Props = {
    isLoading?: boolean
    backdrop_path: string | null
}

export const HeroSection = ({ backdrop_path, isLoading = false }: Props) => {
    const backdropUrl = backdrop_path ? `http://image.tmdb.org/t/p/original/${backdrop_path}` : ""

    return (
        <div className={s.hero} style={{ backgroundImage: !isLoading && backdropUrl ? `url(${backdropUrl})` : "none" }}>
            <div className={s.overlay} />
            <div className={s.heroContent}>
                {isLoading ? (
                    <>
                        <div className={`${s.skeleton} ${s.skeletonTitle}`} />
                        <div className={`${s.skeleton} ${s.skeletonSubtitle}`} />
                        <div className={`${s.skeleton} ${s.skeletonSearch}`} />
                    </>
                ) : (
                    <>
                        <h1 className={s.title}>Welcome</h1>
                        <h2 className={s.subtitle}>Browse highlighted titles from TMDB</h2>
                        <Search />
                    </>
                )}
            </div>
        </div>
    )
}
