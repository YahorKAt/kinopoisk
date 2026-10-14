import {store} from "@/app/model/store";
import {App} from "@/app/ui/App";
import {FAVORITES} from "@/common/constants";
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

store.subscribe(() => {
    const state = store.getState();

    // Сохраняем избранное
    if (state.movies?.favorites) {
        localStorage.setItem(FAVORITES, JSON.stringify(state.movies.favorites));
    }
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
