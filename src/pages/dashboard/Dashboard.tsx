import PageTitle from "@/components/common/PageTitle";

function Dashboard() {
    return (
        <div className='space-y-6 md:space-y-8 xl:space-y-10'>
            <PageTitle>Good morning, Sophia</PageTitle>

            <section className='space-y-2 md:space-y-3'>
                <h2 className='text-lg font-bold tracking-wide'>My Tasks</h2>

                <div className='w-full h-64 bg-brand-card rounded-lg'></div>
            </section>

            <section className='space-y-2 md:space-y-3'>
                <h2 className='text-lg font-bold tracking-wide'>Projects</h2>

                <div className='w-full h-64 bg-brand-card rounded-lg'></div>
            </section>
        </div>
    );
}

export default Dashboard;
