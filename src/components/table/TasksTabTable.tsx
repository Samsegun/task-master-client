import { useGetTasks } from "@/hooks/useTasks";
import type { ProjectRole } from "@/lib/apiTypes";
import type { Statuses, Task } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { CheckCircle, Plus } from "lucide-react";
import { useState } from "react";
import Button from "../common/Button";
import { DataLoadingIcon } from "../common/LoadingIcon";
import StatusBadge from "../common/StatusBadge";
import StatusIcon from "../common/StatusIcon";
import Tabs from "../common/Tabs";
import CreateTaskModal from "../modal/CreateTaskModal";
import DeleteModal from "../modal/DeleteModal";
import EditTaskModal from "../modal/EditTaskModal";
import { Table, TableBody, TableHeader, TableRow } from "../ui/table";
import { TableCell, TableHead } from "./TableUI";
import TasksTableRowOptions from "./TasksTableRowOptions";

type TasksTabProps = {
    projectId: string;
    projectRole: ProjectRole;
    projectMembers: {
        role: ProjectRole;
        joinedAt: string;
        user: {
            id: string;
            firstName: string | null;
            lastName: string | null;
        };
    }[];
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

function TasksTabTable({
    projectMembers,
    projectId,
    projectRole,
}: TasksTabProps) {
    const { isLoading, isError, customErr, tasks, userId } =
        useGetTasks(projectId);
    const [filterStatus, setFilterStatus] = useState<Statuses>("all");
    const [openNewTask, setOpenNewTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState<{
        task: Task;
        option: "EDIT" | "DELETE";
    } | null>(null);

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

                <Button
                    variant={"primary"}
                    className={`flex items-center gap-2`}
                    onClick={() => setOpenNewTask(true)}>
                    <Plus size={30} />
                    <span>New Task</span>
                </Button>
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

                                        <span className='font-medium capitalize'>
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
                                    <TasksTableRowOptions
                                        onEditClick={(
                                            option: "EDIT" | "DELETE"
                                        ) => setSelectedTask({ option, task })}
                                        projectRole={projectRole}
                                        creatorId={task.creatorId}
                                        userId={userId!}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {openNewTask && (
                <CreateTaskModal
                    projectId={projectId}
                    projectMembers={projectMembers}
                    openNewTask={openNewTask}
                    setOpenNewTask={setOpenNewTask}
                />
            )}

            {selectedTask?.option === "EDIT" && (
                <EditTaskModal
                    projectId={projectId}
                    projectMembers={projectMembers}
                    task={selectedTask.task}
                    isOpen={!!selectedTask}
                    onClose={() => setSelectedTask(null)}
                />
            )}

            {selectedTask?.option === "DELETE" && (
                <DeleteModal
                    task={{
                        id: selectedTask.task.id,
                        title: selectedTask.task.title,
                    }}
                    projectId={projectId}
                    isOpen={!!selectedTask}
                    onClose={() => setSelectedTask(null)}
                />
            )}

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
