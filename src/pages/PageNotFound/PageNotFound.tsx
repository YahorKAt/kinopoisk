import {Path} from "@/common/routing/paths";
import {NavLink} from "react-router-dom";
import s from './PageNotFound.module.css'

export const PageNotFound = () => {
    return (
        <div className={s.container}>
            <div className={s.content}>
                <h1 className={s.errorCode}>404</h1>
                <h2 className={s.title}>Страница не найдена</h2>
                <p className={s.description}>
                    Кажется, этот фильм еще не сняли, или вы ошиблись адресом.
                    Проверьте ссылку или вернитесь на главную.
                </p>
                <NavLink to={Path.Main} className={s.button}>
                    Вернуться на главную
                </NavLink>
            </div>
        </div>
    )
}

