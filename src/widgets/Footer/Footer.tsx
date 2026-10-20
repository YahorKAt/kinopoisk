import s from './Footer.module.css'

export const Footer = () => {
    return (
        <footer className={s.footer}>
            <p className={s.footerText}>© 2026 Kinopoisk Demo · Data courtesy of TMDB.</p>
        </footer>
    )
}
