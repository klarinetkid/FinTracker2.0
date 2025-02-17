import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/_Layout";
import GlobalDataCacheProvider from "./contexts/GlobalDataCacheProvider";
import BreakdownPage from "./features/Breakdown/BreakdownPage";
import BudgetPage from "./features/Budget/BudgetPage";
import CategoriesPage from "./features/Categories/CategoriesPage";
import DashboardPage from "./features/Dashboard/DashboardPage";
import FormatsPage from "./features/Formats/FormatsPage";
import ImportPage from "./features/Import/ImportPage";
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
                        <Route path={Pages.Budget} element={<BudgetPage />} />
                        <Route path={Pages.Import} element={<ImportPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </GlobalDataCacheProvider>
    );
}

export default App;
