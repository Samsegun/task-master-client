import PageTitle from "@/components/common/PageTitle";
import { Stats, StatsTitle } from "@/components/common/ProjectStats";
import MyTasksTable from "@/components/table/MyTasksTable";
import type { MyTask, TaskPriority, TaskStatus } from "@/lib/types";
import { Filter } from "lucide-react";
import { useState } from "react";

// mock data - replace with API call
const tasks: MyTask[] = [
    {
        id: "1",
        title: "Design Landing Page",
        description: "Create wireframes and high-fidelity designs for homepage",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: "2024-07-15",
        project: { id: "1", name: "Marketing Campaign" },
        assignee: { name: "Sophia Willson" },
        creator: { name: "John Doe" },
    },
    {
        id: "2",
        title: "Write Blog Post",
        description: "Write article about new features",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: "2024-07-25",
        project: { id: "2", name: "Content Strategy" },
        assignee: { name: "Sophia Willson" },
        creator: { name: "Jane Smith" },
    },
    {
        id: "3",
        title: "Setup Email Campaign",
        description: "Configure automation and templates",
        status: "DONE",
        priority: "HIGH",
        dueDate: "2024-07-10",
        project: { id: "1", name: "Marketing Campaign" },
        assignee: { name: "Sophia Willson" },
        creator: { name: "Bob Johnson" },
    },
    {
        id: "4",
        title: "Review PR #234",
        description: "Code review for authentication module",
        status: "TODO",
        priority: "HIGH",
        dueDate: "2024-07-18",
        project: { id: "3", name: "Product Launch" },
        assignee: { name: "Sophia Willson" },
        creator: { name: "Alice Cooper" },
    },
    {
        id: "5",
        title: "Update Documentation",
        description: "Add API endpoint documentation",
        status: "TODO",
        priority: "LOW",
        dueDate: "2024-08-05",
        project: { id: "3", name: "Product Launch" },
        assignee: { name: "Sophia Willson" },
        creator: { name: "Mike Wilson" },
    },
];

function MyTasks() {
    const [filterStatus, setFilterStatus] = useState<TaskStatus | "all">("all");
    const [filterPriority, setFilterPriority] = useState<TaskPriority | "all">(
        "all"
    );

    // filter tasks
    let filteredTasks = tasks;
    if (filterStatus !== "all") {
        filteredTasks = filteredTasks.filter(t => t.status === filterStatus);
    }
    if (filterPriority !== "all") {
        filteredTasks = filteredTasks.filter(
            t => t.priority === filterPriority
        );
    }

    const todoTasks = filteredTasks.filter(t => t.status === "TODO");
    const inProgressTasks = filteredTasks.filter(
        t => t.status === "IN_PROGRESS"
    );
    const doneTasks = filteredTasks.filter(t => t.status === "DONE");

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

                    <p className='text-2xl font-bold'>{filteredTasks.length}</p>
                </Stats>

                <Stats>
                    <StatsTitle>To Do</StatsTitle>
                    <p className='text-2xl font-bold text-task-todo'>
                        {todoTasks.length}
                    </p>
                </Stats>

                <Stats>
                    <StatsTitle>In Progress</StatsTitle>
                    <p className='text-2xl font-bold text-task-progress'>
                        {inProgressTasks.length}
                    </p>
                </Stats>

                <Stats>
                    <StatsTitle>Completed</StatsTitle>
                    <p className='text-2xl font-bold text-task-completed'>
                        {doneTasks.length}
                    </p>
                </Stats>
            </section>

            {/* filters */}
            <div className='flex flex-wrap gap-4'>
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
            </div>

            {/* tasks table */}
            <MyTasksTable
                filteredTasks={filteredTasks}
                filterPriority={filterPriority}
                filterStatus={filterStatus}
            />
        </div>
    );
}

export default MyTasks;
