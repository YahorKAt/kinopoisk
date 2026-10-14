import {useState} from 'react';
import s from './FilterPanel.module.css';

type Genre = {
    id: number;
    name: string;
};

const genres: Genre[] = [
    {id: 28, name: 'Action'},
    {id: 12, name: 'Adventure'},
    {id: 16, name: 'Animation'},
    {id: 35, name: 'Comedy'},
    {id: 80, name: 'Crime'},
    {id: 99, name: 'Documentary'},
    {id: 18, name: 'Drama'},
    {id: 10751, name: 'Family'},
    {id: 14, name: 'Fantasy'},
    {id: 36, name: 'History'},
    {id: 27, name: 'Horror'},
    {id: 10402, name: 'Music'},
    {id: 9648, name: 'Mystery'},
    {id: 10749, name: 'Romance'},
    {id: 878, name: 'Science Fiction'},
    {id: 10770, name: 'TV Movie'},
    {id: 53, name: 'Thriller'},
    {id: 10752, name: 'War'},
    {id: 37, name: 'Western'},
];

type SortOption = {
    value: string;
    label: string;
};

const sortOptions: SortOption[] = [
    {value: 'popularity.desc', label: 'Popularity ↓'},
    {value: 'popularity.asc', label: 'Popularity ↑'},
    {value: 'vote_average.desc', label: 'Rating ↓'},
    {value: 'vote_average.asc', label: 'Rating ↑'},
    {value: 'primary_release_date.desc', label: 'Release Date ↓'},
    {value: 'primary_release_date.asc', label: 'Release Date ↑'},
];

type Props = {
    onFilterChange?: (filters: {
        sortBy: string;
        ratingRange: [number, number];
        selectedGenres: number[];
    }) => void;
};

export const FilterPanel = ({onFilterChange}: Props) => {
    const [sortBy, setSortBy] = useState('popularity.desc');
    const [ratingMin, setRatingMin] = useState(0);
    const [ratingMax, setRatingMax] = useState(10);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

    const handleGenreToggle = (genreId: number) => {
        setSelectedGenres((prev) =>
            prev.includes(genreId)
                ? prev.filter((id) => id !== genreId)
                : [...prev, genreId]
        );
    };

    const handleReset = () => {
        setSortBy('popularity.desc');
        setRatingMin(0);
        setRatingMax(10);
        setSelectedGenres([]);
        onFilterChange?.({
            sortBy: 'popularity.desc',
            ratingRange: [0, 10],
            selectedGenres: [],
        });
    };

    return (
        <aside className={s.filterPanel}>
            <h2 className={s.title}>Filters / Sort</h2>

            {/* Sort by */}
            <div>
                <label className={s.label} htmlFor="sort-select">
                    Sort by
                </label>
                <select
                    id="sort-select"
                    className={s.select}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Rating range */}
            <div>
                <div className={s.ratingHeader}>
                    <span className={s.label}>Rating</span>
                    <span className={s.ratingValue}>
                        {ratingMin.toFixed(1)} - {ratingMax.toFixed(1)}
                    </span>
                </div>
                <div className={s.sliderContainer}>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={ratingMin}
                        onChange={(e) => setRatingMin(Number(e.target.value))}
                        className={s.slider}
                    />
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={ratingMax}
                        onChange={(e) => setRatingMax(Number(e.target.value))}
                        className={s.slider}
                    />
                </div>
            </div>

            {/* Genres */}
            <div>
                <div className={s.genresGrid}>
                    {genres.map((genre) => (
                        <button
                            key={genre.id}
                            className={`${s.genreButton} ${
                                selectedGenres.includes(genre.id) ? s.active : ''
                            }`}
                            onClick={() => handleGenreToggle(genre.id)}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reset button */}
            <button className={s.resetButton} onClick={handleReset}>
                Reset filters
            </button>
        </aside>
    );
};