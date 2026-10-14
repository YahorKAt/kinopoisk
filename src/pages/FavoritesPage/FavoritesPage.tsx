import {useAppSelector} from "@/common/hooks";
import {selectAllFavorites} from "@/entities/movie/model/movieSlice";
import { MovieCard } from "@/entities/movie/ui"
import s from './FavoritesPage.module.css'

export const FavoritesPage = () => {
    const favorites = useAppSelector(selectAllFavorites);
    return (
        <section className={s.container}>
            <h1 className={s.title}>Favorites Movies</h1>
            {
                favorites.length
                    ? <div className={s.grid}>
                        {favorites.map(f => (
                            <MovieCard key={f.id}
                                       id={f.id}
                                       title={f.title}
                                       poster_path={f.poster_path}
                                       vote_average={f.vote_average}
                            />
                        ))}
                    </div>
                    : <p className={s.subtitle}>Add movies to favorites to see them on this page.</p>
            }
        </section>
    );
};