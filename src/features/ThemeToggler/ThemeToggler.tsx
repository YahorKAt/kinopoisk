import {MoonIcon, SunIcon} from "@/common/components/Icons";
import {useAppDispatch, useAppSelector} from "@/common/hooks";
import {changeTheme, selectThemeMode} from "@/entities/theme/model/themeSlice";
import s from './ThemeToggler.module.css'

export const ThemeToggler = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectThemeMode);

    const changeThemeHandler = () => {
        dispatch(changeTheme())
    }

    return (
        <button className={s.themeButton} onClick={changeThemeHandler} aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon/> : <MoonIcon/>}
        </button>
    );
};