import { getPaginationPages } from "@/common/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import s from "./Pagination.module.css"

type Props = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const Pagination = ({ currentPage, onPageChange, totalPages }: Props) => {
    if (totalPages <= 1) return null

    const fixTotalPages = totalPages >= 500 ? 500 : totalPages


    const pages = getPaginationPages(currentPage, fixTotalPages)

    const goToPrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1)
    }

    const goToNext = () => {
        if (currentPage < fixTotalPages) onPageChange(currentPage + 1)
    }

    return (
        <div className={s.container}>
            <div className={s.pagination}>
                {/* Кнопка "Назад" */}
                <button
                    type="button"
                    className={s.pageButton}
                    aria-label="Previous page"
                    onClick={goToPrev}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Страницы */}
                {pages.map((page, idx) =>
                    page === "..." ? (
                        <span className={s.ellipsis} key={`ellipsis-${idx}`}>
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            type="button"
                            disabled={page === currentPage}
                            onClick={() => page !== currentPage && onPageChange(Number(page))}
                            className={page === currentPage ? `${s.pageButton} ${s.pageButtonActive}` : s.pageButton}
                        >
                            {page}
                        </button>
                    ),
                )}

                {/* Кнопка "Вперёд" */}
                <button
                    type="button"
                    className={s.pageButton}
                    aria-label="Next page"
                    onClick={goToNext}
                    disabled={currentPage === fixTotalPages}
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    )
}
