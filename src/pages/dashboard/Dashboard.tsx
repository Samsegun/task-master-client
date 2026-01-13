import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import PageTitle from "@/components/common/PageTitle";
import DashboardProjectsTable from "@/components/table/DashboardProjectsTable";
import DashboardTasksTable from "@/components/table/DashboardTasksTable";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { Link } from "react-router";

const taskHeaders = ["task", "project", "due date", "status"];
const projectHeaders = ["project", "status", "due date", "progress"];

const tasks = [
    {
        name: "Design landing page",
        project: "Marketing Campaign",
        dueDate: "Jul 15, 2024",
        status: "IN_PROGRESS",
    },
    {
        name: "Develop user onboarding flow",
        project: "Product Launch",
        dueDate: "Jul 20, 2024",
        status: "DONE",
    },
    {
        name: "Write blog post",
        project: "Content Strategy",
        dueDate: "Jul 25, 2024",
        status: "TODO",
    },
];

const projects = [
    {
        name: "marketing campaign",
        progress: 75,
        dueDate: "Jul 15, 2024",
        status: "ACTIVE",
    },
    {
        name: "product launch",
        progress: 100,
        dueDate: "Oct 20, 2024",
        status: "COMPLETED",
    },
    {
        name: "content strategy",
        progress: 50,
        dueDate: "Sep 25, 2024",
        status: "ARCHIVED",
    },
];

function Dashboard() {
    return (
        <div className='space-y-10 xl:space-y-12'>
            <div className='flex justify-between items-center'>
                <PageTitle>Good morning, Sophia</PageTitle>

                <div className='hidden md:block'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='cursor-pointer'>
                            <div>
                                <Avatar
                                    name='Sophia willson'
                                    occupation='product manager'
                                    src='xxxxx'
                                />
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link
                                    to={"/profile"}
                                    className='flex basis-full'>
                                    Profile
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Button
                                    variant={"transparent"}
                                    className='hover:text-red-500 flex gap-2'>
                                    <span>Logout</span> <LogOutIcon />
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <section className='space-y-2 md:space-y-3'>
                <h2 className='text-lg font-bold tracking-wide'>
                    Latest Tasks
                </h2>

                <DashboardTasksTable headers={taskHeaders} tasks={tasks} />
            </section>

            <section className='space-y-2 md:space-y-3'>
                <h2 className='text-lg font-bold tracking-wide'>Projects</h2>

                <DashboardProjectsTable
                    headers={projectHeaders}
                    projects={projects}
                />
            </section>
        </div>
    );
}

export default Dashboard;
