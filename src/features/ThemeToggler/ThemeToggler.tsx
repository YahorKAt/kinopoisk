import { changeThemeAC, selectTheme } from "@/app/model/app-slice"
import {MoonIcon, SunIcon} from "@/common/components/Icons";
import {useAppDispatch, useAppSelector} from "@/common/hooks";
import s from './ThemeToggler.module.css'

export const ThemeToggler = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);

    const changeThemeHandler = () => {
        dispatch(changeThemeAC())
    }

    return (
        <button className={s.themeButton} onClick={changeThemeHandler} aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon/> : <MoonIcon/>}
        </button>
    );
};