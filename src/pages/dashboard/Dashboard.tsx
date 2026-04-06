import DashboardProjectsTable from "@/components/table/DashboardProjectsTable";
import DashboardTasksTable from "@/components/table/DashboardTasksTable";

function Dashboard() {
    return (
        <div>
            <section className='space-y-2 md:space-y-3'>
                <h2 className='text-lg font-bold tracking-wide'>
                    Latest Tasks
                </h2>

                <DashboardTasksTable />
            </section>

            <section className='space-y-2 md:space-y-3'>
                <h2 className='text-lg font-bold tracking-wide'>Projects</h2>

                <DashboardProjectsTable />
            </section>
        </div>
    );
}

export default Dashboard;
