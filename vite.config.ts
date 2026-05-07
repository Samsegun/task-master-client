import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), analyzer()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        minify: true,
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    // Vendor chunks
                    "react-vendor": ["react", "react-dom", "react-router"],
                    "query-vendor": ["@tanstack/react-query"],
                    "form-vendor": [
                        "react-hook-form",
                        "@hookform/resolvers",
                        "zod",
                    ],
                    "utils-vendor": [
                        "zustand",
                        "react-hot-toast",
                        "lucide-react",
                    ],
                },
            },
        },
    },
});
