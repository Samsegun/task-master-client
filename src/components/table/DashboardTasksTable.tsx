import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { useGetMyTasks } from "@/hooks/useTasks";
import { formatDate } from "@/lib/utils";
import { DataLoadingIcon } from "../common/LoadingIcon";
import StatusBadge from "../common/StatusBadge";
import { TableCell, TableHead } from "./TableUI";

const headers = ["task", "project", "due date", "status"];

function DashboardTasksTable() {
    const { myTasks, isLoading, isError, customErr } = useGetMyTasks();

    if (isLoading) {
        return <DataLoadingIcon />;
    }

    if (isError || !myTasks) {
        return <div>Something went wrong :( {customErr?.message}</div>;
    }

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
                    {myTasks.map(t => (
                        <TableRow
                            key={t.title}
                            className='border-b border-brand-primary/10 hover:bg-[#2d3f54]'>
                            <TableCell className='font-medium capitalize'>
                                {t.title}
                            </TableCell>

                            <TableCell className='text-brand-primary/70'>
                                {t.project.name}
                            </TableCell>

                            <TableCell className='text-brand-primary/70'>
                                {formatDate(t.dueDate)}
                            </TableCell>

                            <TableCell>
                                <StatusBadge status={t.status} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default DashboardTasksTable;
