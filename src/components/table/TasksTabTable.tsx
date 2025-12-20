import type { Statuses, Task } from "@/lib/types";
import { CheckCircle, MoreVertical, Plus } from "lucide-react";
import { useState } from "react";
import StatusBadge from "../common/StatusBadge";
import StatusIcon from "../common/StatusIcon";
import Tabs from "../common/Tabs";
import { Menu } from "../Menu/Menu";
import CreateTaskModal from "../modal/CreateTaskModal";
import { Table, TableBody, TableHeader, TableRow } from "../ui/table";
import { TableCell, TableHead } from "./TableUI";

// mock data
const tasks: Task[] = [
    {
        id: "1",
        title: "Design Landing Page",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: "Jul 15, 2024",
        assignee: { name: "John Doe" },
    },
    {
        id: "2",
        title: "Write Blog Post",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: "Jul 25, 2024",
        assignee: { name: "Jane Smith" },
    },
    {
        id: "3",
        title: "Setup Email Campaign",
        status: "DONE",
        priority: "HIGH",
        dueDate: "Jul 10, 2024",
        assignee: { name: "Bob Johnson" },
    },
    {
        id: "4",
        title: "Create Social Media Assets",
        status: "TODO",
        priority: "LOW",
        dueDate: "Jul 30, 2024",
        assignee: null,
    },
];

const taskStatus: Statuses[] = ["all", "TODO", "IN_PROGRESS", "DONE"];
const taskTableHeaders = [
    "task",
    "assignee",
    "priority",
    "due date",
    "status",
    "",
];

function TasksTabTable() {
    const [filterStatus, setFilterStatus] = useState<Statuses>("all");

    const filteredTasks =
        filterStatus === "all"
            ? tasks
            : tasks.filter(t => t.status === filterStatus);

    return (
        <section>
            <div className='flex justify-between items-start'>
                <Tabs
                    activeTab={filterStatus}
                    setActiveTab={setFilterStatus}
                    statusList={taskStatus}
                />

                <Menu initialOpen={false}>
                    <Menu.Trigger
                        variant={"primary"}
                        className='flex items-center gap-2'>
                        <Plus size={30} />
                        New Task
                    </Menu.Trigger>

                    <Menu.Content direction='center'>
                        <CreateTaskModal />
                    </Menu.Content>
                </Menu>
            </div>

            {/* tasks table */}
            <div
                className={`mt-6 md:mt-4 rounded-xl rounded-t-none lg:rounded-t-xl bg-brand-card 
                ${
                    filteredTasks.length !== 0 &&
                    "border border-brand-primary/10"
                }`}>
                <Table>
                    {filteredTasks.length !== 0 && (
                        <TableHeader>
                            <TableRow
                                className='bg-brand-table-header border-b 
         border-brand-primary/10 hover:bg-brand-table-header'>
                                {taskTableHeaders.map(header => (
                                    <TableHead
                                        key={header}
                                        className='lg:first:rounded-tl-xl lg:last:rounded-tr-xl'>
                                        {header}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                    )}

                    <TableBody>
                        {filteredTasks.map(task => (
                            <TableRow
                                key={task.id}
                                className='border-b border-brand-primary/10 hover:bg-[#2d3f54]'>
                                <TableCell>
                                    <div className='flex items-center gap-3'>
                                        {StatusIcon(task.status)}

                                        <span className='font-medium'>
                                            {task.title}
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    {task.assignee ? (
                                        <div className='flex items-center gap-2'>
                                            <div
                                                className='w-8 h-8 rounded-full bg-brand-button flex items-center 
                                        justify-center text-sm'>
                                                {task.assignee.name.charAt(0)}
                                            </div>
                                            <span className='text-brand-primary/70'>
                                                {task.assignee.name}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className='text-brand-gray'>
                                            Unassigned
                                        </span>
                                    )}
                                </TableCell>

                                <TableCell>
                                    <StatusBadge status={task.priority} />
                                </TableCell>

                                <TableCell className='text-brand-primary/70'>
                                    {task.dueDate}
                                </TableCell>

                                <TableCell>
                                    <StatusBadge status={task.status} />
                                </TableCell>

                                <TableCell>
                                    <button className='p-1 hover:bg-brand-gray/50 rounded transition-colors'>
                                        <MoreVertical
                                            size={20}
                                            className='text-brand-gray'
                                        />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {filteredTasks.length === 0 && (
                <div className='text-center py-16 bg-[#263447] rounded-lg border border-brand-gray/50'>
                    <CheckCircle
                        className='mx-auto text-brand-gray mb-4'
                        size={64}
                    />
                    <h3 className='text-xl font-semibold text-brand-gray mb-2'>
                        No tasks found
                    </h3>
                    <p className='text-brand-gray'>
                        {filterStatus === "all"
                            ? "Create your first task to get started"
                            : `No ${filterStatus
                                  .toLowerCase()
                                  .replace("_", " ")} tasks`}
                    </p>
                </div>
            )}
        </section>
    );
}

export default TasksTabTable;
