import { QueryClient } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App.tsx";
import ErrorFallback from "./components/common/ErrorFallBack.tsx";
import "./index.css";

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
                <div role='alert'>
                    <ErrorFallback
                        error={error}
                        resetErrorBoundary={resetErrorBoundary}
                    />
                </div>
            )}>
            <App />
        </ErrorBoundary>
    </StrictMode>
);
