import Button from "@/components/common/Button";
import ProjectDetailsTitles from "@/components/common/ProjectDetailTitles";
import { Stats, StatsTitle } from "@/components/common/ProjectStats";
import StatusBadge from "@/components/common/StatusBadge";
import { StatSkeleton } from "@/components/LoadingSkeletons/AppSkeletons";
import MembersTabTable from "@/components/table/MembersTabTable";
import TasksTabTable from "@/components/table/TasksTabTable";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalModals } from "@/hooks/useGlobalModals";
import { useGetProject } from "@/hooks/useProjects";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

function ProjectDetails() {
    const { projectId } = useParams();
    const { isLoading, isError, customErr, userProject } =
        useGetProject(projectId);
    const { openDeleteProject } = useGlobalModals();

    const [activeTab, setActiveTab] = useState<"tasks" | "members">("tasks");
    const navigate = useNavigate();

    if (isError) return <div>Something went wrong :( {customErr?.message}</div>;

    const name = userProject?.name || "Loading...";
    const description = userProject?.description || "";
    const dueDate = userProject?.dueDate || null;
    const progress = userProject?.progress || 0;
    const status = userProject?.status || "TODO";
    const totalMembers = userProject?.totalMembers || 0;
    const projectRole = userProject?.projectRole || "MEMBER";
    const projectMembers = userProject?.members || [];

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
                    <ProjectDetailsTitles
                        isLoading={isLoading}
                        name={name}
                        description={description}
                    />

                    {isLoading ? (
                        <Skeleton className='h-8 w-2 bg-brand-table-header' />
                    ) : (
                        projectRole === "OWNER" && (
                            <DropdownMenu>
                                <DropdownMenuTrigger className=' hover:bg-brand-gray/30 p-2 rounded-md cursor-pointer transition-colors'>
                                    <MoreVertical size={25} />
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className='bg-brand-sidebar border-nav-border text-brand-primary space-y-2'>
                                    <DropdownMenuItem className='cursor-pointer'>
                                        <span>Mark as Archived</span>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className='cursor-pointer'>
                                        <span>Leave Project</span>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        className='cursor-pointer text-destructive'
                                        onClick={() =>
                                            openDeleteProject({
                                                projectId: userProject!.id,
                                                projectName: name,
                                            })
                                        }>
                                        <span>Delete Project</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )
                    )}
                </div>
            </div>

            {/* stats */}
            <section className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 md:mb-8'>
                <Stats>
                    <StatsTitle>Status</StatsTitle>

                    {isLoading ? (
                        <StatSkeleton />
                    ) : (
                        <p className='text-lg font-semibold'>
                            <StatusBadge status={status} />
                        </p>
                    )}
                </Stats>

                <Stats>
                    <StatsTitle>Progress</StatsTitle>

                    {isLoading ? (
                        <StatSkeleton />
                    ) : (
                        <>
                            <p className='text-lg font-semibold'>{progress}%</p>

                            <Progress
                                value={progress}
                                className='bg-brand-button/30 [&>div]:bg-brand-button'
                            />
                        </>
                    )}
                </Stats>

                <Stats>
                    <StatsTitle>Due Date</StatsTitle>
                    {isLoading ? (
                        <StatSkeleton />
                    ) : (
                        <p className='text-lg font-semibold'>
                            {formatDate(dueDate)}
                        </p>
                    )}
                </Stats>

                <Stats>
                    <StatsTitle>Members</StatsTitle>
                    {isLoading ? (
                        <StatSkeleton />
                    ) : (
                        <p className='text-lg font-semibold'>{totalMembers}</p>
                    )}
                </Stats>
            </section>

            <section className='flex gap-4 mb-6 text-brand-gray border-b border-brand-gray'>
                <button
                    onClick={() => setActiveTab("tasks")}
                    disabled={isLoading}
                    className={`px-4 py-2 transition-colors hover:cursor-pointer ${
                        activeTab === "tasks"
                            ? "text-brand-button border-b-2 border-brand-button"
                            : "hover:text-brand-primary"
                    }`}>
                    Tasks
                </button>

                <button
                    onClick={() => setActiveTab("members")}
                    disabled={isLoading}
                    className={`px-4 py-2 transition-colors hover:cursor-pointer ${
                        activeTab === "members"
                            ? "text-brand-button border-b-2 border-brand-button"
                            : "hover:text-brand-primary"
                    }`}>
                    Members
                </button>
            </section>

            {activeTab === "tasks" ? (
                <TasksTabTable
                    projectId={projectId!}
                    projectRole={projectRole}
                    projectMembers={projectMembers}
                />
            ) : (
                <MembersTabTable
                    project={userProject!}
                    projectRole={projectRole}
                />
            )}
        </div>
    );
}

export default ProjectDetails;
