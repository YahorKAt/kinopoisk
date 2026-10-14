import s from './Pagination.module.css';

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const Pagination = ({currentPage, totalPages, onPageChange}: Props) => {
    const pages = Array.from({length: totalPages}, (_, i) => i + 1);

    return (
        <div className={s.container}>
            <div className={s.pagination}>
                <button
                    className={s.button}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >←
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        className={`${s.button} ${page === currentPage ? s.active : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                <button
                    className={s.button}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >→
                </button>
            </div>
        </div>
    );
};