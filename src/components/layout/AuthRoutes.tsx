// import { useAuthStatus } from "@/hooks/useAuth";
import { Outlet } from "react-router";
// import LoadingIcon from "./LoadingIcon";

function AuthRoutes() {
    // const location = useLocation();
    // const { isLoading, isError, userRole } = useAuthStatus();

    // const from = location.state?.from?.pathname || "/";

    // if (isLoading) {
    //     return <LoadingIcon />;
    // }

    // if (!isError && userRole) {
    //     return <Navigate to={from} replace />;
    // }

    return (
        <div>
            <header
                className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 
            border-b border-nav-border'>
                <div className='flex items-center'>
                    <img src='/logo.png' alt='App Logo' className='h-8 w-8' />
                    <span className='text-xl font-bold'>TaskMaster</span>
                </div>
            </header>

            <main
                className='min-h-screen flex items-center justify-center
          '>
                <section className='min-w-72 xl:min-w-sm'>
                    <Outlet />
                </section>
            </main>
        </div>
    );
}

export default AuthRoutes;
