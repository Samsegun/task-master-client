import Button from "@/components/common/Button";
import { DataLoadingIcon } from "@/components/common/LoadingIcon";
import PageTitle from "@/components/common/PageTitle";
import ProjectCard from "@/components/common/ProjectCard";
import Tabs from "@/components/common/Tabs";
import { useGetProjects } from "@/hooks/useProjects";
import type { Statuses } from "@/lib/types";
import { useCreateProjectModal } from "@/providers/CreateProjectProvider";
import { FolderKanban, Plus } from "lucide-react";
import { useState } from "react";

const projectStatus: Statuses[] = ["all", "ACTIVE", "COMPLETED", "ARCHIVED"];

function Projects() {
    const { isLoading, isError, error, userProjects } = useGetProjects({
        limit: 5,
    });
    const [activeTab, setActiveTab] = useState<Statuses>("all");
    const { openCreateProject } = useCreateProjectModal();

    if (isLoading) {
        return <DataLoadingIcon />;
    }

    if (isError || !userProjects) {
        return <div>Something went wrong :( {error?.message}</div>;
    }

    const filteredProjects =
        activeTab === "all"
            ? userProjects
            : userProjects.filter(p => p.status === activeTab);

    return (
        <div>
            <div className='flex justify-between items-center mb-8'>
                <PageTitle>Projects</PageTitle>

                <Button
                    variant={"primary"}
                    className={`flex items-center gap-2`}
                    onClick={() => openCreateProject()}>
                    <Plus size={30} />
                    <span>New Project</span>
                </Button>
            </div>

            <Tabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                statusList={projectStatus}
            />

            {/* projects */}
            <section
                className='mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2
             lg:grid-cols-3 gap-8 md:gap-6'>
                {filteredProjects!.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </section>

            {/* {openNewProject && (
                <CreateProjectModal
                    openNewProject={openNewProject}
                    setOpenNewProject={setOpenNewProject}
                />
            )} */}

            {/* empty state */}
            {filteredProjects!.length === 0 && (
                <div className='text-center py-16'>
                    <FolderKanban
                        className='mx-auto text-brand-gray/80 mb-4'
                        size={64}
                    />
                    <h3 className='text-xl font-semibold text-brand-gray mb-2'>
                        No projects found
                    </h3>
                    <p className='text-brand-gray'>
                        {activeTab === "all"
                            ? "Create your first project to get started"
                            : `No ${activeTab.toLowerCase()} projects`}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Projects;
