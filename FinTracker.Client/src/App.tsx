import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/_Layout";
import NotFoundPage from "./components/NotFoundPage";
import GlobalDataCacheProvider from "./contexts/GlobalDataCacheProvider";
import TransactionImportProvider from "./contexts/TransactionImportProvider";
import AboutPage from "./features/About/AboutPage";
import BreakdownPage from "./features/Breakdown/BreakdownPage";
import BudgetPage from "./features/Budget/BudgetPage";
import CategoriesPage from "./features/Categories/CategoriesPage";
import DashboardPage from "./features/Dashboard/DashboardPage";
import FormatsPage from "./features/Formats/FormatsPage";
import ImportPage from "./features/Import/ImportPage";
import MemosPage from "./features/Memos/MemosPage";
import TransactionsPage from "./features/Transactions/TransactionsPage";
import "./styles/_global.css";
import "./styles/_variables.css";
import Pages from "./types/Pages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <DashboardPage /> },
            { path: Pages.Breakdown, element: <BreakdownPage /> },
            { path: Pages.Categories, element: <CategoriesPage /> },
            { path: Pages.Formats, element: <FormatsPage /> },
            { path: Pages.Budget, element: <BudgetPage /> },
            {
                path: Pages.Import,
                element: (
                    <TransactionImportProvider>
                        <ImportPage />
                    </TransactionImportProvider>
                ),
            },
            { path: Pages.Memos, element: <MemosPage /> },
            { path: Pages.Transactions, element: <TransactionsPage /> },
            { path: Pages.About, element: <AboutPage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

function App() {
    return (
        <GlobalDataCacheProvider>
            <RouterProvider router={router} />
        </GlobalDataCacheProvider>
    );
}

export default App;
