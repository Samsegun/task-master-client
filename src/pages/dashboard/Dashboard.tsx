import Avatar from "@/components/common/Avatar";
import PageTitle from "@/components/common/PageTitle";
import { Menu } from "@/components/Menu/Menu";

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
                        My Tasks
                    </h2>

                    <div className='w-full h-64 bg-brand-card rounded-lg'></div>
                </section>

                <section className='space-y-2 md:space-y-3'>
                    <h2 className='text-lg font-bold tracking-wide'>
                        Projects
                    </h2>

                    <div className='w-full h-64 bg-brand-card rounded-lg'></div>
                </section>
            </Menu>
        </div>
    );
}

export default Dashboard;
