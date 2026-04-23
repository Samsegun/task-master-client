import type { ReactNode } from "react";

import CreateProjectModalProvider from "./CreateProjectProvider";
import GlobalModalsProvider from "./GlobalModalsProvider";

function AppProviders({ children }: { children: ReactNode }) {
    return (
        <GlobalModalsProvider>
            <CreateProjectModalProvider>{children}</CreateProjectModalProvider>
        </GlobalModalsProvider>
    );
}

export default AppProviders;
