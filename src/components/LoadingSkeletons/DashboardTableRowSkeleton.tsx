import type { TableRowSkeletonProps } from "@/lib/types";
import { TableCell } from "../table/TableUI";
import { Skeleton } from "../ui/skeleton";
import { TableRow } from "../ui/table";

function DashboardTableRowSkeleton({
    rows = 5,
    columns = 4,
}: TableRowSkeletonProps) {
    return Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow
            key={rowIndex}
            className='border-b border-brand-primary/10 hover:bg-transparent'>
            {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex}>
                    <Skeleton className='h-4 w-20 max-w-[150px] bg-brand-table-header' />
                </TableCell>
            ))}
        </TableRow>
    ));
}

export default DashboardTableRowSkeleton;
