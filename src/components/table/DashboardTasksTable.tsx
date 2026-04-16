import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { useGetMyTasks } from "@/hooks/useTasks";
import { formatDate } from "@/lib/utils";
import { useGlobalModals } from "@/providers/GlobalModalsProvider";
import { CheckCircle } from "lucide-react";
import { Fragment, useState } from "react";
import Button from "../common/Button";
import StatusBadge from "../common/StatusBadge";
import TableRowSkeleton from "../LoadingSkeletons/TableRowSkeleton";
import { TableCell, TableHead } from "./TableUI";

const headers = ["task", "project", "due date", "status"];

function DashboardTasksTable() {
    const { myTasks, isLoading, isError, customErr } = useGetMyTasks();
    const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
    const { openEdit } = useGlobalModals();

    if (isError) return <div>Something went wrong :( {customErr?.message}</div>;

    return (
        <div
            className='rounded-xl rounded-t-none lg:rounded-t-xl
         bg-brand-card border border-brand-primary/10'>
            <Table>
                <TableHeader>
                    <TableRow
                        className='bg-brand-table-header border-b 
                    border-brand-primary/10 hover:bg-brand-table-header'>
                        {headers.map(header => (
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
                        // skeleton loaders
                        <TableRowSkeleton rows={3} />
                    ) : myTasks!.length === 0 ? (
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
                                    You have no tasks assigned
                                </p>
                            </TableCell>
                        </TableRow>
                    ) : (
                        myTasks!.map(task => (
                            <Fragment key={task.id}>
                                <TableRow
                                    key={task.title}
                                    className='border-b border-brand-primary/10 cursor-pointer hover:bg-[#2d3f54]'
                                    onClick={() =>
                                        setExpandedTaskId(
                                            expandedTaskId === task.id
                                                ? null
                                                : task.id
                                        )
                                    }>
                                    <TableCell className='font-medium capitalize'>
                                        {task.title}
                                    </TableCell>

                                    <TableCell className='text-brand-primary/70'>
                                        {task.project.name}
                                    </TableCell>

                                    <TableCell className='text-brand-primary/70'>
                                        {formatDate(task.dueDate)}
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
                                                                task.updatedAt
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
                                                            openEdit({ task });
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

export default DashboardTasksTable;
