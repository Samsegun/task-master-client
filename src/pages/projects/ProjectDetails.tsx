import Button from "@/components/common/Button";
import PageTitle from "@/components/common/PageTitle";
import { Stats, StatsTitle } from "@/components/common/ProjectStats";
import StatusBadge from "@/components/common/StatusBadge";
import MembersTabTable from "@/components/table/MembersTabTable";
import TasksTabTable from "@/components/table/TasksTabTable";
import { Progress } from "@/components/ui/progress";
import type { Member, Project } from "@/lib/types";
import { ArrowLeft, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

export const members: Member[] = [
    {
        id: "1",
        name: "Sophia Willson",
        email: "sophia@example.com",
        role: "OWNER",
    },
    {
        id: "2",
        name: "John Doe",
        email: "john@example.com",
        role: "MEMBER",
    },
    {
        id: "3",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "MEMBER",
    },
];

function ProjectDetails() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"tasks" | "members">("tasks");

    const project: Project = {
        id: projectId!,
        name: "Marketing Campaign",
        description:
            "Q4 2024 marketing strategy and execution across all channels",
        status: "ACTIVE",
        progress: 75,
        dueDate: "Jul 15, 2024",
        memberCount: 5,
        completedTasks: 12,
        totalTasks: 16,
        owner: {
            name: "Sophia Willson",
            email: "sophia@example.com",
        },
    };

    return (
        <div>
            <div className='mb-8'>
                <Button
                    type='button'
                    variant={"details"}
                    onClick={() => navigate("/projects")}
                    className='flex items-center gap-2 hover:text-brand-gray mb-4 transition-colors'>
                    <ArrowLeft size={20} />
                    Back to Projects
                </Button>

                <div className='mt-6 flex justify-between items-start'>
                    <div>
                        <PageTitle className=' mb-2'>{project.name}</PageTitle>
                        <p className='text-brand-gray'>{project.description}</p>
                    </div>

                    <Button
                        variant={"transparent"}
                        className='bg-brand-gray/40 hover:bg-brand-gray/30 p-2 transition-colors'>
                        <Settings size={20} />
                    </Button>
                </div>
            </div>

            {/* stats */}
            <section className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 md:mb-8'>
                <Stats>
                    <StatsTitle>Status</StatsTitle>

                    <p className='text-lg font-semibold'>
                        <StatusBadge status={project.status} />
                    </p>
                </Stats>

                <Stats>
                    <StatsTitle>Progress</StatsTitle>

                    <p className='text-lg font-semibold'>{project.progress}%</p>

                    <Progress
                        value={project.progress}
                        className='bg-brand-button/30 [&>div]:bg-brand-button'
                    />
                </Stats>

                <Stats>
                    <StatsTitle>Due Date</StatsTitle>
                    <p className='text-lg font-semibold'>{project.dueDate}</p>
                </Stats>

                <Stats>
                    <StatsTitle>Members</StatsTitle>
                    <p className='text-lg font-semibold'>{members.length}</p>
                </Stats>
            </section>

            <section className='flex gap-4 mb-6 text-brand-gray border-b border-brand-gray'>
                <button
                    onClick={() => setActiveTab("tasks")}
                    className={`px-4 py-2 transition-colors hover:cursor-pointer ${
                        activeTab === "tasks"
                            ? "text-brand-button border-b-2 border-brand-button"
                            : "hover:text-brand-primary"
                    }`}>
                    Tasks
                </button>

                <button
                    onClick={() => setActiveTab("members")}
                    className={`px-4 py-2 transition-colors hover:cursor-pointer ${
                        activeTab === "members"
                            ? "text-brand-button border-b-2 border-brand-button"
                            : "hover:text-brand-primary"
                    }`}>
                    Members
                </button>
            </section>

            {/* tasks tab */}
            {activeTab === "tasks" && <TasksTabTable />}

            {/* members tab */}
            {activeTab === "members" && <MembersTabTable members={members} />}
        </div>
    );
}

export default ProjectDetails;
