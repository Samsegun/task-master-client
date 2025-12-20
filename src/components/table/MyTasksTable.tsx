import type { MyTask, TaskPriority, TaskStatus } from "@/lib/types";
import { formatDate, isOverdue } from "@/lib/utils";
import { Calendar, CheckCircle, FolderKanban } from "lucide-react";
import { useNavigate } from "react-router";
import StatusBadge from "../common/StatusBadge";
import StatusIcon from "../common/StatusIcon";
import { Table, TableBody, TableHeader, TableRow } from "../ui/table";
import { TableCell, TableHead } from "./TableUI";

interface MyTasksTableProps {
    filteredTasks: MyTask[];
    filterStatus: TaskStatus | "all";
    filterPriority: TaskPriority | "all";
}

const tableHeaders = ["tasks", "project", "priority", "due date", "status"];

function MyTasksTable({
    filteredTasks,
    filterStatus,
    filterPriority,
}: MyTasksTableProps) {
    const navigate = useNavigate();

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
                    {filteredTasks.length === 0 ? (
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
                            <TableRow
                                key={task.id}
                                className='border-b border-brand-primary/10 hover:bg-[#2d3f54]'
                                onClick={() =>
                                    navigate(`/projects/${task.project.id}`)
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
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default MyTasksTable;
