import {store} from "@/app/model/store";
import {THEME} from "@/common/constants";
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {App} from "./app/ui/App/App";

// Синхронизация темы с localStorage при каждом изменении
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem(THEME, state.app.themeMode);
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
