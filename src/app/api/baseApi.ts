import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: async (args, api, extraOptions) => {
        await new Promise((res) => setTimeout(res, 2000))

        const result = await fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BASE_URL,
            prepareHeaders: (headers) => {
                headers.set("Authorization", `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`)
                headers.set("accept", "application/json")
                return headers
            },
        })(args, api, extraOptions)

        return result
    },

    tagTypes: ["Movies", "Cast", "Similar", "Genres"],
    endpoints: () => ({}),
})
