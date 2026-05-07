import PageTitle from "@/components/common/PageTitle";
import { Stats, StatsTitle } from "@/components/common/ProjectStats";
import StatValue from "@/components/common/StatValue";
import MyTasksTable from "@/components/table/MyTasksTable";
import { useGetMyTasks } from "@/hooks/useTasks";
import type { TaskPriority, TaskStatus } from "@/lib/apiTypes";
import { Filter } from "lucide-react";
import { useState } from "react";

function MyTasks() {
    const { myTasks, isLoading, isError, customErr } = useGetMyTasks({
        limit: 5,
    });
    const [filterStatus, setFilterStatus] = useState<TaskStatus | "all">("all");
    const [filterPriority, setFilterPriority] = useState<TaskPriority | "all">(
        "all"
    );

    if (isError) return <div>Something went wrong :( {customErr?.message}</div>;

    // filter tasks when tasks load
    let filteredTasks = myTasks || [];
    let todoTasks = [];
    let inProgressTasks = [];
    let completedTasks = [];

    if (myTasks) {
        filteredTasks = myTasks;

        if (filterStatus !== "all")
            filteredTasks = filteredTasks.filter(
                t => t.status === filterStatus
            );

        if (filterPriority !== "all")
            filteredTasks = filteredTasks.filter(
                t => t.priority === filterPriority
            );

        todoTasks = filteredTasks.filter(t => t.status === "TODO");
        inProgressTasks = filteredTasks.filter(t => t.status === "IN_PROGRESS");
        completedTasks = filteredTasks.filter(t => t.status === "DONE");
    }

    function clearFilters() {
        setFilterStatus("all");
        setFilterPriority("all");
    }

    return (
        <div className='space-y-10 xl:space-y-12'>
            {/* header */}
            <div className='mb-8'>
                <PageTitle>My Tasks</PageTitle>

                <p className='text-brand-gray mt-2'>
                    Tasks assigned to you across all projects
                </p>
            </div>

            {/* stats */}
            <section className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <Stats>
                    <StatsTitle>Total Tasks</StatsTitle>

                    <StatValue
                        isLoading={isLoading}
                        value={filteredTasks.length}
                    />
                </Stats>

                <Stats>
                    <StatsTitle>To Do</StatsTitle>

                    <StatValue
                        isLoading={isLoading}
                        value={todoTasks.length}
                        className={"text-task-todo"}
                    />
                </Stats>

                <Stats>
                    <StatsTitle>In Progress</StatsTitle>

                    <StatValue
                        isLoading={isLoading}
                        value={inProgressTasks.length}
                        className={"text-task-progress"}
                    />
                </Stats>

                <Stats>
                    <StatsTitle>Completed</StatsTitle>

                    <StatValue
                        isLoading={isLoading}
                        value={completedTasks.length}
                        className={"text-task-completed"}
                    />
                </Stats>
            </section>

            {/* filters */}
            <section className='flex flex-wrap gap-4'>
                <div className='flex items-center gap-2'>
                    <Filter size={20} className='text-brand-gray' />
                    <span className='text-gray-400 text-sm font-semibold tracking-wider'>
                        Filters:
                    </span>
                </div>

                {/* status */}
                <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value as any)}
                    className='bg-[#263447] border border-brand-gray rounded-lg px-4 py-2 
                    focus:outline-none focus:ring-2 focus:ring-primary'>
                    <option value='all'>All Status</option>
                    <option value='TODO'>To Do</option>
                    <option value='IN_PROGRESS'>In Progress</option>
                    <option value='DONE'>Done</option>
                </select>

                {/* priority */}
                <select
                    value={filterPriority}
                    onChange={e => setFilterPriority(e.target.value as any)}
                    className='bg-[#263447] border border-brand-gray rounded-lg px-4 py-2
                     focus:outline-none focus:ring-2 focus:ring-primary'>
                    <option value='all'>All Priority</option>
                    <option value='HIGH'>High</option>
                    <option value='MEDIUM'>Medium</option>
                    <option value='LOW'>Low</option>
                </select>

                {/* clear filters */}
                {(filterStatus !== "all" || filterPriority !== "all") && (
                    <button
                        onClick={clearFilters}
                        className='text-brand-button hover:text-brand-button/80 text-sm 
                        transition-colors font-semibold tracking-wider cursor-pointer'>
                        Clear filters
                    </button>
                )}
            </section>

            {/* tasks table */}
            <MyTasksTable
                filteredTasks={filteredTasks!}
                filterPriority={filterPriority}
                filterStatus={filterStatus}
                isLoading={isLoading}
            />
        </div>
    );
}

export default MyTasks;
