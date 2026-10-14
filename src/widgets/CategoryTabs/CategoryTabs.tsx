import {NavLink} from 'react-router-dom';
import {Path} from '@/common/routing/paths';
import s from './CategoryTabs.module.css';

type Category = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

type Tab = {
    id: Category;
    label: string;
};

const tabs: Tab[] = [
    {id: 'popular', label: 'Popular Movies'},
    {id: 'top_rated', label: 'Top Rated Movies'},
    {id: 'upcoming', label: 'Upcoming Movies'},
    {id: 'now_playing', label: 'Now Playing Movies'},
];


export const CategoryTabs = () => {
    return (
        <div className={s.categoryNav}>
            <div className={s.tabsContainer}>
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.id}
                        to={`${Path.Category}/${tab.id}`}
                        className={({isActive}) => `${s.tab} ${isActive ? s.active : ''}`}
                    >
                        {tab.label}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};