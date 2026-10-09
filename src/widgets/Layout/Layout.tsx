import {Footer, Header} from "@/widgets";
import {Outlet} from 'react-router-dom';
import s from './Layout.module.css'


export const Layout = () => {
    return (
        <div className={s.layoutContainer}> {/* Здесь ты делаешь min-h-screen и flex-col */}
            <Header/>
            <main className={s.mainContent}>
                {/* Outlet рендерит дочерний маршрут (например, MainPage) именно здесь */}
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};