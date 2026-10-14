export type RatingColor = 'red' | 'yellow' | 'green';

/**
 * Определяет цвет рейтинга на основе значения
 * @param rating - значение рейтинга от 0 до 10
 * @returns цвет: 'red' (0-3), 'yellow' (3.1-7), 'green' (7+)
 */
export const getRatingColor = (rating: number): RatingColor => {
    if (rating <= 3) return 'red';
    if (rating <= 7) return 'yellow';
    return 'green';
};

/**
 * Возвращает CSS-переменную для цвета рейтинга
 */
export const getRatingColorVar = (rating: number): string => {
    const color = getRatingColor(rating);
    const colorMap: Record<RatingColor, string> = {
        red: 'var(--color-red-600)',
        yellow: 'var(--color-yellow-400)',
        green: 'var(--color-green-600)',
    };
    return colorMap[color];
};