import {Path} from "@/common/routing/paths";
import {useGetMoviesByCategoryQuery} from "@/entities/movie/api/moviesApi";
import {CategoryTabs, MoviesGrid, Pagination} from "@/widgets";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import s from './CategoryPage.module.css'


const VALID_CATEGORIES = ['popular', 'top_rated', 'upcoming', 'now_playing'] as const;
type Category = typeof VALID_CATEGORIES[number];

const categoryTitles: Record<Category, string> = {
    popular: 'Popular Movies',
    top_rated: 'Top Rated Movies',
    upcoming: 'Upcoming Movies',
    now_playing: 'Now Playing Movies',
};

export const CategoryPage = () => {
    const {category} = useParams<{ category: string }>();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 20;
    const totalPages = 5;
    const startIndex = (currentPage - 1) * moviesPerPage;

    const currentCategory: Category = VALID_CATEGORIES.includes(category as Category)
        ? (category as Category)
        : 'popular';

    const {data, isLoading, error} = useGetMoviesByCategoryQuery({
        category: currentCategory,
        page: currentPage
    });

    const paginatedMovies = data?.results.slice(startIndex, startIndex + moviesPerPage);

    useEffect(() => {
        if (category && !VALID_CATEGORIES.includes(category as Category)) {
            navigate(`${Path.Category}/popular`, {replace: true});
        }
    }, [category, navigate]);

    useEffect(() => {
        setCurrentPage(1);
    }, [currentCategory]);

    if (isLoading) return <div className={s.loading}>Loading...</div>;
    if (error) return <div className={s.error}>Error loading movies</div>;


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };


    return (
        <section className={s.categoryPage}>
            <CategoryTabs/>
            <section className={s.moviesSection}>
                <h2 className={s.title}>{categoryTitles[currentCategory]}</h2>

                {paginatedMovies
                    ? <MoviesGrid movies={paginatedMovies}/>
                    : 'No movies found'
                }


                {data && data.total_pages > 1 &&
                    <Pagination currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                    />
                }
            </section>
        </section>
    );
};