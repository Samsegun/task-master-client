import PageTitle from "@/components/common/PageTitle";

function Profile() {
    return (
        <div className='space-y-10 xl:space-y-12'>
            {/* header */}
            <div className='mb-8'>
                <PageTitle>Profile</PageTitle>

                <p className='text-brand-gray mt-2'>User Profile</p>
            </div>

            <section>
                <p>user profile content goes here</p>
            </section>
        </div>
    );
}

export default Profile;
