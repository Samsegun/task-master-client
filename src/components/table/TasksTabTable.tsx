import { useGetTasks } from "@/hooks/useTasks";
import type { ProjectRole } from "@/lib/apiTypes";
import type { MemberShape, Statuses } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useModalStore } from "@/store/useModalStore";
import { CheckCircle, Plus } from "lucide-react";
import { useState } from "react";
import Button from "../common/Button";
import StatusBadge from "../common/StatusBadge";
import StatusIcon from "../common/StatusIcon";
import Tabs from "../common/Tabs";
import { ProjectTasksTableSkeletons } from "../LoadingSkeletons/AppSkeletons";
import { Table, TableBody, TableHeader, TableRow } from "../ui/table";
import { TableCell, TableHead } from "./TableUI";
import TasksTableRowOptions from "./TasksTableRowOptions";

type TasksTabProps = {
    projectId: string;
    projectRole: ProjectRole;
    projectMembers?: MemberShape[];
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
    projectId,
    projectRole,
    projectMembers,
}: TasksTabProps) {
    const { isLoading, isError, customErr, tasks, userId } =
        useGetTasks(projectId);
    const [filterStatus, setFilterStatus] = useState<Statuses>("all");
    const openModal = useModalStore(state => state.openModal);

    if (isError) return <div>Something went wrong :( {customErr?.message}</div>;

    // filter tasks
    let filteredTasks = tasks || [];

    if (tasks) {
        filteredTasks =
            filterStatus === "all"
                ? filteredTasks
                : filteredTasks.filter(t => t.status === filterStatus);
    }

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
                    disabled={isLoading}
                    onClick={() =>
                        openModal("createTask", { projectId, projectMembers })
                    }>
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

                    <TableBody>
                        {isLoading ? (
                            <ProjectTasksTableSkeletons />
                        ) : filteredTasks.length === 0 ? (
                            <TableRow
                                className='rounded-lg 
                            border border-brand-gray/50 hover:bg-transparent'>
                                <TableCell
                                    colSpan={6}
                                    className='py-16 text-center'>
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
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredTasks.map(task => (
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
                                        {task.assignee?.id ? (
                                            <div className='flex items-center gap-2'>
                                                <div
                                                    className='w-8 h-8 rounded-full bg-brand-button flex items-center 
                                        justify-center text-sm'>
                                                    {(
                                                        task.assignee?.username?.charAt(
                                                            0
                                                        ) ??
                                                        task.assignee?.firstName?.charAt(
                                                            0
                                                        ) ??
                                                        "?"
                                                    ).toUpperCase()}
                                                </div>
                                                <span className='text-brand-primary/70 capitalize'>
                                                    {task.assignee?.username ??
                                                        task.assignee
                                                            ?.firstName ??
                                                        "Unknown"}
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
                                            modalData={{ task, projectMembers }}
                                            projectRole={projectRole}
                                            creatorId={task.creator.id}
                                            userId={userId ?? ""}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}

export default TasksTabTable;
