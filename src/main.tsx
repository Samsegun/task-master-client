import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App.tsx";
import ErrorFallback from "./components/common/ErrorFallBack.tsx";
import "./index.css";
import { CreateProjectModalProvider } from "./providers/CreateProjectProvider.tsx";
import { GlobalModalsProvider } from "./providers/GlobalModalsProvider.tsx";

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
            <QueryClientProvider client={queryClient}>
                <GlobalModalsProvider>
                    <CreateProjectModalProvider>
                        <App />
                    </CreateProjectModalProvider>
                </GlobalModalsProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    </StrictMode>
);
