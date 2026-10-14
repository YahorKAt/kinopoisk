import {Search} from "@/features";
import s from './SearchPage.module.css'

export const SearchPage = () => {
    return (
        <section className={s.container}>
            <h1 className={s.title}>Search Results</h1>
            <Search/>
            <section>
                <div></div>
                <p className={s.subtitle}>Enter a movie title to start searching.</p>
            </section>
        </section>
    );
};