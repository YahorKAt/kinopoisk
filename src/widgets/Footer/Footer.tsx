import s from './Footer.module.css'

export const Footer = () => {
    return (
        <footer className={s.footer}>
            <p className={s.footerText}>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
        </footer>
    )
}
