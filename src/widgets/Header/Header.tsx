import { selectStatus } from "@/app/model/app-slice"
import { LinearProgress } from "@/common/components/LinearProgress/LinearProgress"
import { useAppSelector } from "@/common/hooks"
import { Path } from "@/common/routing/paths"
import { ThemeToggler } from "@/features"
import { NavLink } from "react-router-dom"
import logo from "@/assets/main-logo.svg"
import s from "./Header.module.css"

interface NavItem {
    to: string
    label: string
}

const navItems: NavItem[] = [
    { to: Path.Main, label: "Main" },
    { to: Path.Category, label: "Category movies" },
    { to: Path.Filtered, label: "Filtered movies" },
    { to: Path.Search, label: "Search" },
    { to: Path.Favorites, label: "Favorites" },
]

export const Header = () => {
    const status = useAppSelector(selectStatus)
    const isLoading = status === "loading"

    return (
        <>
            <header className={s.headerContainer}>
                <div className={s.wrapper}>
                    <NavLink to={Path.Main} className={s.logoLink} aria-label="Go to TMDB home">
                        <img className={s.logo} src={logo} alt="TMDB Logo" />
                    </NavLink>

                    <nav className={s.navList}>
                        {navItems.map((navItem) => (
                            <NavLink
                                className={({ isActive }) => `${s.navItem} ${isActive ? s.active : ""}`}
                                key={navItem.to}
                                to={navItem.to}
                            >
                                {navItem.label}
                            </NavLink>
                        ))}
                    </nav>
                    <ThemeToggler />
                </div>
            </header>
            <LinearProgress isLoading={isLoading} />
        </>
    )
}
