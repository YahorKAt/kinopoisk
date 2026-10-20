import { baseQuery } from "@/app/api/baseQuery"
import { handleError } from "@/common/utils"
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"

type TBaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>

const DEFAULT_PARAMS: Record<string, string | number | boolean> = {
    language: "en-US",
}

export const baseQueryWithErrorHandling: TBaseQuery = async (args, api, extraOptions) => {
    const fetchArgs = typeof args === "string" ? { url: args } : args

    const mergedParams = { ...DEFAULT_PARAMS, ...fetchArgs.params }

    const result = await baseQuery({ ...fetchArgs, params: mergedParams }, api, extraOptions)

    handleError(api, result)

    return result
}
