import DashboardProjectsTable from "@/components/table/DashboardProjectsTable";
import DashboardTasksTable from "@/components/table/DashboardTasksTable";

function Dashboard() {
    return (
        <div className='space-y-7 md:space-y-10'>
            <section className='space-y-3'>
                <h2 className='text-lg font-bold tracking-wide'>
                    Latest Tasks
                </h2>

                <DashboardTasksTable />
            </section>

            <section className='space-y-3'>
                <h2 className='text-lg font-bold tracking-wide'>Projects</h2>

                <DashboardProjectsTable />
            </section>
        </div>
    );
}

export default Dashboard;
