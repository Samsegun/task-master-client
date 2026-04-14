import PageTitle from "@/components/common/PageTitle";
import UserPasswordUpdateForm from "@/components/common/UserPasswordUpdateForm";
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

            <section className='space-y-3'>
                <h2 className='md:text-lg xl:text-xl font-medium tracking-wide'>
                    Update User password
                </h2>

                <UserPasswordUpdateForm />
            </section>
        </div>
    );
}

export default Profile;
