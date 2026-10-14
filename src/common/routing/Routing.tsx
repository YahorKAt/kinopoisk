import {Path} from "@/common/routing/paths";
import { MoviePage } from "@/pages/MoviePage/MoviePage"
import {Layout} from "@/widgets";
import {CategoryPage, FavoritesPage, FilterPage, MainPage, PageNotFound, SearchPage} from "@/pages";
import {Navigate, Route, Routes} from "react-router-dom";

export const Routing = () => {
    return (
        <Routes>
            {/* Группа страниц с Header и Footer */}
            <Route element={<Layout />}>
                <Route path={Path.Main} element={<MainPage />} />
                <Route path={Path.Category} element={<Navigate to={`${Path.Category}/popular`} replace />} />
                <Route path={`${Path.Category}/:category`} element={<CategoryPage />} />
                <Route path={Path.Filtered} element={<FilterPage />} />
                <Route path={Path.Search} element={<SearchPage />} />
                <Route path={Path.Favorites} element={<FavoritesPage />} />

                <Route path={`${Path.Movie}/:id`} element={<MoviePage />} />
            </Route>

            {/* Страницы БЕЗ Header и Footer */}
            <Route path={Path.NotFound} element={<PageNotFound />} />
        </Routes>
    )
}