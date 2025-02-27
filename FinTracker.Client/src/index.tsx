import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

if (document.cookie.split("; ").indexOf("darkmode=1") > -1) {
    document.documentElement.classList.add("darkmode");
}

const root = document.getElementById("root");
if (!root) throw new Error("#root not found");
createRoot(root).render(
    //<StrictMode>
        <App />
    //</StrictMode>
);
