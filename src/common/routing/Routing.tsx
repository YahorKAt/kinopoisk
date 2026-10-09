import {Path} from "@/common/routing/paths";
import {Layout} from "@/widgets";
import {CategoryPage, FavoritesPage, FilterPage, MainPage, PageNotFound, SearchPage} from "@/pages";
import {Route, Routes} from "react-router-dom";

export const Routing = () => {
    return (
        <Routes>
            {/* Группа страниц с Header и Footer */}
            <Route element={<Layout/>}>
                <Route path={Path.Main} element={<MainPage/>}/>
                <Route path={Path.Category} element={<CategoryPage/>}/>
                <Route path={Path.Filtered} element={<FilterPage/>}/>
                <Route path={Path.Search} element={<SearchPage/>}/>
                <Route path={Path.Favorites} element={<FavoritesPage/>}/>
            </Route>

            {/* Страницы БЕЗ Header и Footer */}
            <Route path={Path.NotFound} element={<PageNotFound/>}/>
        </Routes>
    )
}