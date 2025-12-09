import Button from "@/components/common/Button";
import PageTitle from "@/components/common/PageTitle";
import ProjectCard from "@/components/common/ProjectCard";
import Tabs from "@/components/common/Tabs";
import type { Project, ProjectStatus } from "@/lib/types";
import { FolderKanban, Plus } from "lucide-react";
import { useState } from "react";

// mock data
const projects: Project[] = [
    {
        id: "1",
        name: "Marketing Campaign",
        status: "ACTIVE",
        progress: 75,
        dueDate: "Jul 15, 2024",
        memberCount: 5,
        completedTasks: 12,
        totalTasks: 16,
    },
    {
        id: "2",
        name: "Product Launch",
        status: "COMPLETED",
        progress: 100,
        dueDate: "Oct 20, 2024",
        memberCount: 3,
        completedTasks: 8,
        totalTasks: 8,
    },
    {
        id: "3",
        name: "Content Strategy",
        status: "ARCHIVED",
        progress: 50,
        dueDate: "Sep 25, 2024",
        memberCount: 2,
        completedTasks: 4,
        totalTasks: 8,
    },
    {
        id: "4",
        name: "Website Redesign",
        status: "ACTIVE",
        progress: 30,
        dueDate: "Aug 30, 2024",
        memberCount: 4,
        completedTasks: 3,
        totalTasks: 10,
    },
    {
        id: "5",
        name: "Mobile App",
        status: "ACTIVE",
        progress: 60,
        dueDate: "Sep 10, 2024",
        memberCount: 6,
        completedTasks: 6,
        totalTasks: 10,
    },
];

function Projects() {
    const [activeTab, setActiveTab] = useState<"all" | ProjectStatus>("all");

    const filteredProjects =
        activeTab === "all"
            ? projects
            : projects.filter(p => p.status === activeTab);

    return (
        <div>
            <div className='flex justify-between items-center mb-8'>
                <PageTitle>Projects</PageTitle>

                <Button
                    type='button'
                    variant={"primary"}
                    className={`invisible md:visible flex items-center gap-2`}>
                    <Plus size={30} />
                    New Project
                </Button>
            </div>

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* projects */}
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6'>
                {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </section>

            {/* empty state */}
            {filteredProjects.length === 0 && (
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
