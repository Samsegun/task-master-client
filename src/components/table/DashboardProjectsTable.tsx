import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { useGetProjects } from "@/hooks/useProjects";
import { formatDate } from "@/lib/utils";
import { DataLoadingIcon } from "../common/LoadingIcon";
import StatusBadge from "../common/StatusBadge";
import { Progress } from "../ui/progress";
import { TableCell, TableHead } from "./TableUI";

const headers = ["project", "status", "due date", "progress"];

function DashboardProjectsTable() {
    const { userProjects, isLoading, isError, customErr } = useGetProjects();

    if (isLoading) {
        return <DataLoadingIcon />;
    }

    if (isError || !userProjects) {
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
                    {userProjects.map(project => (
                        <TableRow
                            key={project.name}
                            className='border-b border-brand-primary/10 hover:bg-[#2d3f54]'>
                            <TableCell className='font-medium capitalize'>
                                {project.name}
                            </TableCell>

                            <TableCell className='text-brand-primary/70 '>
                                <StatusBadge status={project.status} />
                            </TableCell>

                            <TableCell className='text-brand-primary/70 '>
                                {formatDate(project.dueDate)}
                            </TableCell>

                            <TableCell className='w-52 flex flex-col lg:flex-row justify-between items-center gap-2'>
                                <Progress
                                    value={project.progress}
                                    className='bg-brand-button/30
                                     [&>div]:bg-brand-button lg:basis-3/4'
                                />
                                <span>{project.progress}%</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default DashboardProjectsTable;
