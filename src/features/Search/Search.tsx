import { useSearchParams } from "react-router-dom"
import s from "./Search.module.css"
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react"

interface Props {
    onSearch: (query: string) => void
}

export const Search = ({ onSearch }: Props) => {
    const [searchParams] = useSearchParams()
    const urlQuery = searchParams.get("query") || ""

    const [inputValue, setInputValue] = useState(urlQuery)

    useEffect(() => {
        setInputValue(urlQuery)
    }, [urlQuery])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSearch(inputValue.trim())
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInputValue(newValue)

        if (!newValue) {
            onSearch("")
        }
    }

    const isButtonDisabled = !inputValue.trim()

    return (
        <form className={s.searchForm} onSubmit={handleSubmit}>
            <input
                type="search"
                className={s.searchInput}
                placeholder="Search for a movie"
                value={inputValue}
                onChange={handleChange}
            />
            <button type="submit" className={s.searchButton} disabled={isButtonDisabled}>
                Search
            </button>
        </form>
    )
}
