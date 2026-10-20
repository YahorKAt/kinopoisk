import { useEffect, useState } from "react"

export const useDebounceValue = <T>(value: T, delay: number = 200): T => {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(timeoutId)
    }, [value, delay])

    return debounced
}
