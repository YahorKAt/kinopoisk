import {baseApi} from "@/app/api/baseApi";
import { appReducer, appSlice } from "@/app/model/app-slice"
import {moviesReducer, moviesSlice} from "@/entities/movie/model/movieSlice";
import {themeReducer, themeSlice} from "@/entities/theme/model/themeSlice";
import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"

export const store = configureStore({
    reducer: {
        [appSlice.name]: appReducer,
        [themeSlice.name]: themeReducer,
        [moviesSlice.name]: moviesReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

