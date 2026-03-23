import { useGetTasks } from "@/hooks/useTasks";
import type { ProjectRole } from "@/lib/apiTypes";
import type { Statuses } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { CheckCircle, MoreVertical, Plus } from "lucide-react";
import { useState } from "react";
import { DataLoadingIcon } from "../common/LoadingIcon";
import StatusBadge from "../common/StatusBadge";
import StatusIcon from "../common/StatusIcon";
import Tabs from "../common/Tabs";
import { Dialog } from "../Dialog/Dialog";
import CreateTaskModal from "../modal/CreateTaskModal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Table, TableBody, TableHeader, TableRow } from "../ui/table";
import { TableCell, TableHead } from "./TableUI";

type TasksTabProps = {
    projectId: string | undefined;
    projectRole: ProjectRole;
};

const taskStatus: Statuses[] = ["all", "TODO", "IN_PROGRESS", "DONE"];
const taskTableHeaders = [
    "task",
    "assignee",
    "priority",
    "due date",
    "status",
    "",
];

function TasksTabTable({ projectId, projectRole }: TasksTabProps) {
    const { isLoading, isError, customErr, tasks } = useGetTasks(projectId);
    const [filterStatus, setFilterStatus] = useState<Statuses>("all");

    if (isLoading) return <DataLoadingIcon />;

    if (isError || !tasks)
        return <div>Something went wrong :( {customErr?.message}</div>;

    // filter tasks
    let filteredTasks = tasks;
    filteredTasks =
        filterStatus === "all"
            ? filteredTasks
            : filteredTasks.filter(t => t.status === filterStatus);

    return (
        <section>
            <div className='flex justify-between items-start'>
                <Tabs
                    activeTab={filterStatus}
                    setActiveTab={setFilterStatus}
                    statusList={taskStatus}
                />

                <Dialog>
                    <Dialog.Trigger
                        variant={"primary"}
                        className={`flex items-center gap-2`}>
                        <Plus size={30} />

                        <span>New Task</span>
                    </Dialog.Trigger>

                    <Dialog.Content height='auto'>
                        <CreateTaskModal projectId={projectId} />
                    </Dialog.Content>
                </Dialog>
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
                                                {task.assignee.firstName.charAt(
                                                    0
                                                )}
                                            </div>
                                            <span className='text-brand-primary/70'>
                                                {task.assignee.firstName}{" "}
                                                {task.assignee.lastName}
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
                                    {formatDate(task.dueDate)}
                                </TableCell>

                                <TableCell>
                                    <StatusBadge status={task.status} />
                                </TableCell>

                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className='p-1 hover:bg-brand-gray/50 rounded transition-colors cursor-pointer'>
                                            <MoreVertical
                                                size={20}
                                                className='text-brand-gray'
                                            />
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <p>Edit</p>
                                            </DropdownMenuItem>

                                            {projectRole === "OWNER" && (
                                                <DropdownMenuItem className="cursor-pointer">
                                                    <p>Delete</p>
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
