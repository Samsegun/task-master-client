import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App.tsx";
import ErrorFallback from "./components/common/ErrorFallBack.tsx";
import "./index.css";
import AppProviders from "./providers/AppProviders.tsx";

const container = document.getElementById("root");
if (!container)
    throw new Error(
        "Root container not found. Ensure there is a div with id 'root' in index.html."
    );

const root = createRoot(container);

root.render(
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
            <AppProviders>
                <App />
            </AppProviders>
        </ErrorBoundary>
    </StrictMode>
);
