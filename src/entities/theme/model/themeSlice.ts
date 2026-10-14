import {THEME} from "@/common/constants";
import {createAppSlice} from "@/common/utils";

export type ThemeType = 'light' | 'dark';

export const themeSlice = createAppSlice({
    name: 'theme',
    initialState: {
        theme: (localStorage.getItem(THEME) as ThemeType) || 'dark',
    },
    selectors: {
        selectThemeMode: (state) => state.theme,
    },
    reducers: {
        changeTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem(THEME, state.theme);
        },
    },
});

export const {changeTheme} = themeSlice.actions;
export const {selectThemeMode} = themeSlice.selectors
export const themeReducer = themeSlice.reducer;


