import type { TaskPriority, Tasks, TaskStatus } from "@/lib/apiTypes";
import { formatDate, isOverdue } from "@/lib/utils";
import { useModalStore } from "@/store/useModalStore";
import { Calendar, CheckCircle, FolderKanban } from "lucide-react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import Button from "../common/Button";
import StatusBadge from "../common/StatusBadge";
import StatusIcon from "../common/StatusIcon";
import { MyTasksTableSkeletons } from "../LoadingSkeletons/AppSkeletons";
import { Table, TableBody, TableHeader, TableRow } from "../ui/table";
import { TableCell, TableHead } from "./TableUI";

interface MyTasksTableProps {
    filteredTasks: Tasks["tasks"];
    filterStatus: TaskStatus | "all";
    filterPriority: TaskPriority | "all";
    isLoading: boolean;
}

const tableHeaders = ["tasks", "project", "priority", "due date", "status"];

function MyTasksTable({
    filteredTasks,
    filterStatus,
    filterPriority,
    isLoading,
}: MyTasksTableProps) {
    const openModal = useModalStore(state => state.openModal);

    const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

    return (
        <div
            className='rounded-xl rounded-t-none lg:rounded-t-xl bg-brand-card
                 border border-brand-primary/10'>
            <Table>
                <TableHeader>
                    <TableRow
                        className='bg-brand-table-header border-b 
         border-brand-primary/10 hover:bg-brand-table-header'>
                        {tableHeaders.map(header => (
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
                        <MyTasksTableSkeletons />
                    ) : filteredTasks.length === 0 ? (
                        <TableRow className='hover:bg-brand-bg'>
                            <TableCell colSpan={5} className='p-16 text-center'>
                                <CheckCircle
                                    className='mx-auto text-brand-gray mb-4'
                                    size={64}
                                />

                                <h3 className='text-xl font-semibold text-brand-gray mb-2'>
                                    No tasks found
                                </h3>

                                <p className='text-brand-gray'>
                                    {filterStatus !== "all" ||
                                    filterPriority !== "all"
                                        ? "Try adjusting your filters"
                                        : "You have no tasks assigned"}
                                </p>
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredTasks.map(task => (
                            <Fragment key={task.id}>
                                <TableRow
                                    key={task.id}
                                    className='border-b border-brand-primary/10 hover:bg-[#2d3f54] cursor-pointer'
                                    onClick={() =>
                                        setExpandedTaskId(
                                            expandedTaskId === task.id
                                                ? null
                                                : task.id
                                        )
                                    }>
                                    <TableCell className='p-4'>
                                        <div className='flex items-center gap-3'>
                                            {StatusIcon(task.status)}
                                            <div>
                                                <p className='font-medium'>
                                                    {task.title}
                                                </p>
                                                {task.description && (
                                                    <p className='text-xs text-wrap text-brand-gray mt-1'>
                                                        {task.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className='flex items-center gap-2'>
                                            <FolderKanban
                                                size={16}
                                                className='text-brand-button'
                                            />
                                            <span>{task.project.name}</span>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <StatusBadge status={task.priority} />
                                    </TableCell>

                                    <TableCell>
                                        <div className='flex items-center gap-2'>
                                            <Calendar
                                                size={16}
                                                className='text-brand-gray'
                                            />

                                            <span
                                                className={
                                                    isOverdue(
                                                        task.dueDate,
                                                        task.status
                                                    )
                                                        ? "text-red-500 font-medium"
                                                        : "text-brand-primary/70"
                                                }>
                                                {formatDate(task.dueDate)}
                                                {isOverdue(
                                                    task.dueDate,
                                                    task.status
                                                ) && (
                                                    <span className='ml-2 text-xs'>
                                                        (overdue)
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <StatusBadge status={task.status} />
                                    </TableCell>
                                </TableRow>

                                {/* expanded row */}
                                {expandedTaskId === task.id && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className='bg-[#1a2332] p-6'>
                                            <div className='space-y-4'>
                                                {/* description */}
                                                {task.description && (
                                                    <div>
                                                        <h4 className='text-sm font-medium text-gray-400 mb-2'>
                                                            Description
                                                        </h4>
                                                        <p className='text-gray-300'>
                                                            {task.description}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* details Grid */}
                                                <section className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                                                    <div>
                                                        <p className='text-xs text-gray-400 mb-1'>
                                                            Creator
                                                        </p>
                                                        <p className='text-white'>
                                                            {task.creator
                                                                .username ||
                                                                task.creator
                                                                    .firstName}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className='text-xs text-gray-400 mb-1'>
                                                            Created
                                                        </p>
                                                        <p className='text-white'>
                                                            {formatDate(
                                                                task.createdAt
                                                            )}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className='text-xs text-gray-400 mb-1'>
                                                            Last Updated
                                                        </p>
                                                        <p className='text-white'>
                                                            {formatDate(
                                                                task.createdAt
                                                            )}
                                                        </p>
                                                    </div>

                                                    {task.completedAt && (
                                                        <div>
                                                            <p className='text-xs text-gray-400 mb-1'>
                                                                Completed
                                                            </p>
                                                            <p className='text-white'>
                                                                {formatDate(
                                                                    task.completedAt
                                                                )}
                                                            </p>
                                                        </div>
                                                    )}
                                                </section>

                                                {/* actions */}
                                                <div className='flex gap-3 pt-2'>
                                                    <Button
                                                        variant={"primary"}
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            openModal(
                                                                "editTask",
                                                                {
                                                                    task,
                                                                    projectMembers:
                                                                        task
                                                                            .project
                                                                            .members,
                                                                }
                                                            );
                                                        }}
                                                        className='bg-blue-600 hover:bg-blue-700'>
                                                        Edit Task
                                                    </Button>

                                                    <Button
                                                        variant={"secondary"}
                                                        onClick={e => {
                                                            e.stopPropagation();
                                                            setExpandedTaskId(
                                                                null
                                                            );
                                                        }}>
                                                        Close
                                                    </Button>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </Fragment>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default MyTasksTable;
