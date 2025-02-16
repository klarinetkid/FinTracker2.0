import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/_Layout";
import GlobalDataCacheProvider from "./contexts/GlobalDataCacheProvider";
import BreakdownPage from "./features/Breakdown/BreakdownPage";
import CategoriesPage from "./features/Categories/CategoriesPage";
import DashboardPage from "./features/Dashboard/DashboardPage";
import FormatsPage from "./features/Formats/FormatsPage";
import "./styles/Form.css";
import Pages from "./types/Pages";

function App() {
    return (
        <GlobalDataCacheProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<DashboardPage />} />
                        <Route
                            path={Pages.Breakdown}
                            element={<BreakdownPage />}
                        />
                        <Route
                            path={Pages.Categories}
                            element={<CategoriesPage />}
                        />
                        <Route path={Pages.Formats} element={<FormatsPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </GlobalDataCacheProvider>
    );
}

export default App;
