import {FAVORITES} from "@/common/constants";
import {createAppSlice} from "@/common/utils";

export type FavoriteMovie = {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
};

const getInitialFavorites = (): FavoriteMovie[] => {
    const saved = localStorage.getItem(FAVORITES);
    try {
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

export const moviesSlice = createAppSlice({
    name: "movies",
    initialState: {
        favorites: getInitialFavorites(),
    },
    selectors: {
        selectIsFavorite: (state, id: number) => {
            return state.favorites.some((movie) => movie.id === id);
        },
        selectAllFavorites: (state) => state.favorites,
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const movie: FavoriteMovie = action.payload;
            const index = state.favorites.findIndex((fav) => fav.id === movie.id);

            if (index === -1) {
                state.favorites.push(movie);
            } else {
                state.favorites.splice(index, 1);
            }
        },
    },
});

export const {toggleFavorite} = moviesSlice.actions;
export const {selectIsFavorite, selectAllFavorites} = moviesSlice.selectors
export const moviesReducer = moviesSlice.reducer;