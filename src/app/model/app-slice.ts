import { THEME } from "@/common/constants"
import type { RequestStatus } from "@/common/types"
import { createAppSlice } from "@/common/utils"
import { isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"

export type ThemeMode = "dark" | "light"

export const appSlice = createAppSlice({
    name: "app",
    initialState: {
        theme: (localStorage.getItem(THEME) as ThemeMode) || "dark",
        status: "idle" as RequestStatus,
        error: null as string | null,
    },
    selectors: {
        selectTheme: (state) => state.theme,
        selectStatus: (state) => state.status,
        selectAppError: (state) => state.error,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, (state) => {
                state.status = "loading"
            })
            .addMatcher(isFulfilled, (state) => {
                state.status = "succeeded"
            })
            .addMatcher(isRejected, (state) => {
                state.status = "failed"
            })
    },
    reducers: (create) => ({
        changeThemeAC: create.reducer((state) => {
            state.theme = state.theme === "light" ? "dark" : "light"
        }),
        setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
            state.error = action.payload.error
        }),
    }),
})

export const appReducer = appSlice.reducer
export const { changeThemeAC, setAppErrorAC } = appSlice.actions
export const { selectTheme, selectStatus, selectAppError } = appSlice.selectors
