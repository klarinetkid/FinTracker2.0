import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalDataCacheProvider from "./contexts/GlobalDataCacheProvider";
import BreakdownPage from "./pages/BreakdownPage";
import CategoriesPage from "./pages/CategoriesPage";
import DashboardPage from './pages/DashboardPage';
import Layout from './pages/_Layout';
import "./styles/Form.css";
import Pages from "./types/Pages";

function App() {

    return (
        <GlobalDataCacheProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<DashboardPage />} />
                        <Route path={Pages.Breakdown} element={<BreakdownPage />} />
                        <Route path={Pages.Categories} element={<CategoriesPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </GlobalDataCacheProvider>
    )

}

export default App
