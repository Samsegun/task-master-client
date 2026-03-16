import type { Project } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Calendar, CheckCircle, FolderKanban, Users } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router";
import { Progress } from "../ui/progress";
import StatusBadge from "./StatusBadge";

function ProjectCard({ project }: { project: Project }) {
    return (
        <article
            className='bg-brand-card rounded-lg p-6 border hover:border-brand-gray
                    border-nav-border transition-all'>
            {/* project header */}
            <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center gap-3'>
                    <div className='bg-brand-button/10 p-2 rounded'>
                        <FolderKanban className='text-brand-button' size={20} />
                    </div>

                    <h3 className='font-semibold text-brand-card-header'>
                        {project.name}
                    </h3>
                </div>
            </div>

            {/* status Badge */}
            <div className='mb-4'>
                <StatusBadge status={project.status} />
            </div>

            {/* progress */}
            <div className='mb-4'>
                <div className='flex justify-between text-sm mb-2'>
                    <span className='text-brand-gray'>Progress</span>
                    <span className='font-medium'>{project.progress}%</span>
                </div>

                <Progress
                    value={project.progress}
                    className='bg-brand-button/30 [&>div]:bg-brand-button transition-all'
                />
            </div>

            {/* info */}
            <div className='space-y-2 mb-4 text-sm text-brand-gray'>
                <div className='flex items-center gap-2'>
                    <Calendar size={16} />

                    <span>
                        {project.status === "COMPLETED"
                            ? "✓ Completed"
                            : `Due: ${formatDate(project.dueDate)}`}
                    </span>
                </div>

                <div className='flex items-center gap-2'>
                    <Users size={16} />
                    <span>{project._count.members} members</span>
                </div>

                <div className='flex items-center gap-2'>
                    <CheckCircle size={16} />

                    <span>
                        {project.completedTasks}/{project.totalTasks} tasks
                    </span>
                </div>
            </div>

            <Link
                to={`/projects/${project.id}`}
                className='h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm
                 font-medium w-full text-navlink bg-brand-button/70 
            hover:text-brand-primary hover:bg-brand-button'>
                View Details
            </Link>
        </article>
    );
}

export default memo(ProjectCard);
