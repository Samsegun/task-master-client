import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "../common/StatusBadge";
import { TableCell, TableHead } from "./TableUI";

interface TasksTableProps {
    headers: string[];
    tasks: {
        name: string;
        project: string;
        dueDate: string;
        status: string;
    }[];
}

function TasksTable({ headers, tasks }: TasksTableProps) {
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
                    {tasks.map(t => (
                        <TableRow
                            key={t.name}
                            className='border-b border-brand-primary/10 hover:bg-brand-link/70'>
                            <TableCell className='font-medium capitalize'>
                                {t.name}
                            </TableCell>

                            <TableCell className='text-brand-primary/70'>
                                {t.project}
                            </TableCell>

                            <TableCell className='text-brand-primary/70'>
                                {t.dueDate}
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

export default TasksTable;
