import s from "./Search.module.css";
import {useState} from "react";
import * as React from "react";

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('SearchIcon:', searchQuery);
    };

    return (
        <form className={s.searchForm} onSubmit={handleSearch}>
            <input
                type="search"
                className={s.searchInput}
                placeholder="Search for a movie"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className={s.searchButton}>
                Search
            </button>
        </form>
    );
};