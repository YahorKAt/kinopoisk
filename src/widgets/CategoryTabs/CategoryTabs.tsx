import { categoryLabels } from "@/common/constants"
import { Category } from "@/common/enums"
import { NavLink } from "react-router-dom"
import { Path } from "@/common/routing/paths"
import s from "./CategoryTabs.module.css"

export const CategoryTabs = () => {
    return (
        <div className={s.categoryNav}>
            <div className={s.tabsContainer}>
                {Object.values(Category).map((category) => (
                    <NavLink
                        key={category}
                        to={`${Path.Category}/${category}`}
                        className={({ isActive }) => `${s.category} ${isActive ? s.active : ""}`}
                    >
                        {categoryLabels[category]}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}
