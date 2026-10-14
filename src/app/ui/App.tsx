import { useAppSelector } from "@/common/hooks"
import { Routing } from "@/common/routing"
import { selectThemeMode } from "@/entities/theme/model/themeSlice"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"

export const App = () => {
    const theme = useAppSelector(selectThemeMode)

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
    }, [theme])

    return (
        <>
            <Routing />
            <ToastContainer position="bottom-left" theme={"colored"} />
        </>
    )
}
