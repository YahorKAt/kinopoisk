import {appReducer, appSlice} from "@/app/app-slice";
import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"

export const store = configureStore({
    reducer: {
        [appSlice.name]: appReducer,
    },
    // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

