import { baseQueryWithErrorHandling } from "@/app/api/baseQueryWithErrorHandling"
import { createApi } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
    reducerPath: "baseApi",
    tagTypes: ["Movies", "Cast", "Similar", "Genres"],
    baseQuery: baseQueryWithErrorHandling,
    endpoints: () => ({}),
})
