import { queryClient } from "@/lib/QueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { CreateProjectModalProvider } from "./CreateProjectProvider";
import { GlobalModalsProvider } from "./GlobalModalsProvider";

function AppProviders({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalModalsProvider>
                <CreateProjectModalProvider>
                    {children}
                </CreateProjectModalProvider>
            </GlobalModalsProvider>
        </QueryClientProvider>
    );
}

export default AppProviders;
