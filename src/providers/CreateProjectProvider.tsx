import CreateProjectModal from "@/components/modal/CreateProjectModal";
import { CreateProjectModalContext } from "@/hooks/useProjectModals";
import { useState, type ReactNode } from "react";

function CreateProjectModalProvider({ children }: { children: ReactNode }) {
    const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

    const openCreateProject = () => setIsCreateProjectOpen(true);
    const closeCreateProject = () => setIsCreateProjectOpen(false);

    return (
        <CreateProjectModalContext.Provider
            value={{
                openCreateProject,
                closeCreateProject,
                isCreateProjectOpen,
            }}>
            {children}
            <CreateProjectModal
                openNewProject={isCreateProjectOpen}
                setOpenNewProject={setIsCreateProjectOpen}
            />
        </CreateProjectModalContext.Provider>
    );
}

export default CreateProjectModalProvider;
