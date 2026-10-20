import { setAppErrorAC } from "@/app/model/app-slice"
import { isErrorWithStatusMessage } from "@/common/utils/isErrorWithStatusMessage"
import type { BaseQueryApi, QueryReturnValue, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query"

export const handleError = (
    api: BaseQueryApi,
    result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
) => {
    if (!result.error) return

    let errorMessage = "Some error occurred."
    const { status, data } = result.error

    if (typeof status === "string") {
        errorMessage = result.error.error || `Network error: ${status}`
    } else {
        switch (status) {
            case 403:
                errorMessage = "Forbidden. Please check your API Key."
                break

            case 400:
            case 401:
            case 404:
                if (isErrorWithStatusMessage(data)) {
                    errorMessage = data.status_message
                } else {
                    errorMessage = `HTTP Error: ${status}`
                }
                break

            default:
                errorMessage = `Server error: ${status}`
                break
        }
    }

    api.dispatch(setAppErrorAC({ error: errorMessage }))
}
