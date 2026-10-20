export type ErrorResponse = {
    status_code: number
    status_message: string
    success: boolean
}

export const isErrorWithStatusMessage = (error: unknown): error is ErrorResponse => {
    return (
        typeof error === "object" &&
        error !== null &&
        "status_message" in error &&
        typeof (error as ErrorResponse).status_message === "string"
    )
}
