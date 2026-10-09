import {selectThemeMode} from "@/app/app-slice";
import {useAppSelector} from "@/common/hooks";
import {Routing} from "@/common/routing";
import {useEffect} from "react";

export const App = () => {
    const theme = useAppSelector(selectThemeMode);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
     return (
        <Routing/>
    )
}