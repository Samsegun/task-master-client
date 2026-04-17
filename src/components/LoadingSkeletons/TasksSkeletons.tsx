import type { TableRowSkeletonProps } from "@/lib/types";
import { MoreVertical } from "lucide-react";
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
            className='border-b border-brand-primary/10 hover:bg-transparent'>
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
            className='border-b border-brand-primary/10 hover:bg-transparent'>
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

function StatSkeleton() {
    return <Skeleton className='h-6 w-10 bg-brand-table-header' />;
}

export { MyTasksTableSkeletons, ProjectTasksTableSkeletons, StatSkeleton };
