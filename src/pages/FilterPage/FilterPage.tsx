import {useGetMoviesByCategoryQuery} from "@/entities/movie/api/moviesApi";
import {FilterPanel, MoviesGrid, Pagination} from "@/widgets";
import {useState} from "react";
import s from './FilterPage.module.css'

export const FilterPage = () => {
    const {data} = useGetMoviesByCategoryQuery({category: 'popular'});

    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 10;

    // Временная логика пагинации (потом заменим на API)
    const totalPages = 5;
    const startIndex = (currentPage - 1) * moviesPerPage;
    const paginatedMovies = data?.results.slice(startIndex, startIndex + moviesPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
    const handleFilterChange = () => {
        // Здесь будет логика фильтрации через API
    };


    return (
        <section className={s.filterPage}>
            <div className={s.content}>
                <FilterPanel onFilterChange={handleFilterChange}/>
                <div className={s.body}>

                    {paginatedMovies ? <MoviesGrid movies={paginatedMovies}/> : null}

                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
                </div>
            </div>
        </section>
    );
};