import { Outlet } from "react-router-dom";
import MenuPage from "./MenuPage";

function Layout() {

    return (
        <>
            <MenuPage />
            <Outlet />
        </>
    )
}

export default Layout;