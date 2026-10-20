import { selectAppError, selectTheme, setAppErrorAC } from "@/app/model/app-slice"
import { THEME } from "@/common/constants"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { Routing } from "@/common/routing"
import { useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"

export const App = () => {
    const theme = useAppSelector(selectTheme)
    const error = useAppSelector(selectAppError)
    const dispatch = useAppDispatch()

    useEffect(() => {
        localStorage.setItem(THEME, theme)
        document.documentElement.setAttribute("data-theme", theme)
    }, [theme])

    useEffect(() => {
        if (error) {
            toast.error(error, {
                onClose: () => dispatch(setAppErrorAC({ error: null })),
            })
        }
    }, [error, dispatch])

    return (
        <>
            <Routing />
            <ToastContainer
                position="bottom-left"
                theme={theme === "dark" ? "dark" : "light"}
                autoClose={5000}
                pauseOnHover
            />
        </>
    )
}
