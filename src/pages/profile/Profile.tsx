import PageTitle from "@/components/common/PageTitle";
import UserProfileUpdateForm from "@/components/common/UserProfileUpdateForm";

function Profile() {
    return (
        <div className='space-y-10'>
            <div>
                <PageTitle>Profile</PageTitle>
            </div>

            <section className='space-y-3'>
                <h2 className='md:text-lg xl:text-xl font-medium tracking-wide'>
                    Update User Data
                </h2>

                <UserProfileUpdateForm />
            </section>
        </div>
    );
}

export default Profile;
