import { createContext, useContext } from "react";

type ContextType = {
    openCreateProject: () => void;
    closeCreateProject: () => void;
    isCreateProjectOpen: boolean;
};

export const CreateProjectModalContext = createContext<ContextType | undefined>(
    undefined
);

export function useCreateProjectModal() {
    const ctx = useContext(CreateProjectModalContext);
    if (!ctx)
        throw new Error(
            "useCreateProjectModal must be used within CreateProjectModalProvider"
        );
    return ctx;
}
