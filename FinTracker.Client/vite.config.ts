import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vitePluginSvgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [react(), vitePluginSvgr()],
});
