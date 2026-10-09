import {THEME} from "@/common/constants";
import {createSlice} from "@reduxjs/toolkit"

export const appSlice = createSlice({
    name: "app",
    initialState: {
        themeMode: localStorage.getItem(THEME) === 'light' ? 'light' : 'dark'
    },
    selectors: {
        selectThemeMode: (state) => state.themeMode,
    },
    reducers: (create) => ({
        changeThemeModeAC: create.reducer((state) => {
            state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
        })
    }),
})

export const {selectThemeMode} = appSlice.selectors
export const {changeThemeModeAC} = appSlice.actions
export const appReducer = appSlice.reducer

