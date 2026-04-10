import PageTitle from "@/components/common/PageTitle";
import DashboardProjectsTable from "@/components/table/DashboardProjectsTable";
import DashboardTasksTable from "@/components/table/DashboardTasksTable";

function Dashboard() {
    return (
        <div className='space-y-7 md:space-y-10'>
            <section className='space-y-3'>
                <PageTitle className='text-lg font-bold tracking-wide'>
                    Latest Tasks
                </PageTitle>

                <DashboardTasksTable />
            </section>

            <section className='space-y-3'>
                <PageTitle className='text-lg font-bold tracking-wide'>
                    Projects
                </PageTitle>

                <DashboardProjectsTable />
            </section>
        </div>
    );
}

export default Dashboard;
