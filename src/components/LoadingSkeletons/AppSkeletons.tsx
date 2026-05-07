import type { TableRowSkeletonProps } from "@/lib/types";
import {
    Calendar,
    CheckCircle,
    FolderKanban,
    MoreVertical,
    Users,
} from "lucide-react";
import { TableCell } from "../table/TableUI";
import { Skeleton } from "../ui/skeleton";
import { TableRow } from "../ui/table";

function MyTasksTableSkeletons({
    rows = 5,
    columns = 5,
}: TableRowSkeletonProps) {
    return Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow
            key={rowIndex}
            className='border-b border-brand-primary/10 hover:bg-brand-table-header'>
            <TableCell key={"first-cell"} className='p-4 space-y-2'>
                <Skeleton className=' h-4 w-28 max-w-[150px] bg-brand-table-header' />
                <Skeleton className=' h-4 w-32 max-w-[150px] bg-brand-table-header' />
            </TableCell>

            {Array.from({ length: columns - 1 }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                    <Skeleton className='h-4 w-20 max-w-[150px] bg-brand-table-header' />
                </TableCell>
            ))}
        </TableRow>
    ));
}

function ProjectTasksTableSkeletons({
    rows = 5,
    columns = 6,
}: TableRowSkeletonProps) {
    return Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow
            key={rowIndex}
            className='border-b border-brand-primary/10 hover:bg-brand-table-header'>
            <TableCell key={"first-cell"}>
                <Skeleton className=' h-4 w-24 max-w-[150px] bg-brand-table-header' />
            </TableCell>

            {Array.from({ length: columns - 2 }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                    <Skeleton className='h-4 w-20 max-w-[150px] bg-brand-table-header' />
                </TableCell>
            ))}

            <TableCell key={"last-cell"}>
                <MoreVertical size={20} className='text-brand-gray' />
            </TableCell>
        </TableRow>
    ));
}

function ProjectsSkeleton({ numOfLoaders = 5 }: { numOfLoaders?: number }) {
    return Array.from({ length: numOfLoaders }).map((_, index) => (
        <div
            key={index}
            className='min-w-[200px] space-y-4 bg-brand-card 
    rounded-lg p-6 border border-nav-border'>
            {/* project header */}
            <div className='flex items-center gap-3'>
                <div className='bg-brand-button/10 p-2 rounded'>
                    <FolderKanban className='text-brand-button' size={20} />
                </div>

                <Skeleton className='w-full h-4 bg-brand-table-header' />
            </div>

            {/* status Badge */}
            <div className=''>
                <Skeleton className='w-20 h-4 bg-brand-table-header' />
            </div>

            {/* progress */}
            <div className='mb-4'>
                <div className='flex justify-between text-sm mb-2'>
                    <span className='text-brand-gray'>Progress</span>
                    <Skeleton className='w-10 h-4 bg-brand-table-header' />
                </div>

                <Skeleton className='w-full h-4 bg-brand-table-header' />
            </div>

            {/* info */}
            <div className='space-y-2 text-sm text-brand-gray'>
                <div className='flex items-center gap-2'>
                    <Calendar size={16} />

                    <Skeleton className='w-20 h-4 bg-brand-table-header' />
                </div>

                <div className='flex items-center gap-2'>
                    <Users size={16} />
                    <Skeleton className='w-20 h-4 bg-brand-table-header' />
                </div>

                <div className='flex items-center gap-2'>
                    <CheckCircle size={16} />

                    <Skeleton className='w-20 h-4 bg-brand-table-header' />
                </div>
            </div>

            <Skeleton className='h-10 px-4 py-2 w-full rounded-md bg-brand-button/70' />
        </div>
    ));
}

function StatSkeleton() {
    return <Skeleton className='h-6 w-10 bg-brand-table-header' />;
}

export {
    MyTasksTableSkeletons,
    ProjectsSkeleton,
    ProjectTasksTableSkeletons,
    StatSkeleton,
};
