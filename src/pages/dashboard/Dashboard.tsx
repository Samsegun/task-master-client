import Avatar from "@/components/common/Avatar";
import PageTitle from "@/components/common/PageTitle";
import { Menu } from "@/components/Menu/Menu";
import ProjectsTable from "@/components/table/ProjectsTable";
import TasksTable from "@/components/table/TasksTable";

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
        <div className='space-y-6 md:space-y-8 xl:space-y-10'>
            <Menu initialOpen={false}>
                <div className='flex justify-between items-center'>
                    <PageTitle>Good morning, Sophia</PageTitle>

                    <div className='hidden md:block'>
                        <Avatar
                            name='Sophia willson'
                            occupation='product manager'
                            src='xxxxx'
                        />
                    </div>
                </div>

                <Menu.Trigger>
                    <span>Modal</span>
                </Menu.Trigger>

                <Menu.Content direction='center'>
                    <section className=''>
                        <h2>Modal</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Fuga labore, voluptatibus maiores maxime
                            numquam deserunt autem voluptate placeat voluptas
                            officia. Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Ab nisi sunt blanditiis dicta
                            omnis Lorem ipsum dolor sit amet consectetur,
                            adipisicing elit. Quas dicta molestiae eaque magnam,
                            porro, quae possimus ad minus, voluptate nulla quis
                            id iure nisi deleniti quibusdam accusamus provident.
                            Labore, sunt?
                        </p>
                    </section>
                </Menu.Content>

                <section className='space-y-2 md:space-y-3'>
                    <h2 className='text-lg font-bold tracking-wide'>
                        Latest Tasks
                    </h2>

                    <TasksTable headers={taskHeaders} tasks={tasks} />
                </section>

                <section className='space-y-2 md:space-y-3'>
                    <h2 className='text-lg font-bold tracking-wide'>
                        Projects
                    </h2>

                    <ProjectsTable
                        headers={projectHeaders}
                        projects={projects}
                    />
                </section>
            </Menu>
        </div>
    );
}

export default Dashboard;
