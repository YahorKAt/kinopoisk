import type { RequestStatus } from "@/common/types"
import { createAppSlice } from "@/common/utils"
import { isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"

export type ThemeMode = "dark" | "light"

export const appSlice = createAppSlice({
    name: "app",
    initialState: {
        themeMode: "light" as ThemeMode,
        status: "idle" as RequestStatus,
        error: null as string | null,
    },
    selectors: {
        selectThemeMode: (state) => state.themeMode,
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
        changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
            state.themeMode = action.payload.themeMode
        }),
        setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
            state.error = action.payload.error
        }),
    }),
})

export const appReducer = appSlice.reducer
export const { changeThemeModeAC, setAppErrorAC } = appSlice.actions
export const { selectThemeMode, selectStatus, selectAppError } = appSlice.selectors
