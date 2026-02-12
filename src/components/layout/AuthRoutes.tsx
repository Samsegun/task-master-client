// import { useAuthStatus } from "@/hooks/useAuth";
import { useAuthStatus } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";
import Header from "../common/Header";
import LoadingIcon from "../common/LoadingIcon";
import Logo from "../common/Logo";

function AuthRoutes() {
    const { isLoading, isAuthenticated } = useAuthStatus();
    const location = useLocation();

    // useEffect(() => {
    //     if (isError) {
    //         console.log(error);
    //         toast.error(customErr?.message || "Authentication failed");
    //     }
    // }, [isError, error, customErr]);

    const from = location.state?.from?.pathname || "/";

    if (isLoading) {
        return <LoadingIcon />;
    }

    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }

    return (
        <div>
            <Header>
                <div className='flex items-center'>
                    <Logo />

                    <span className='text-xl font-bold'>TaskMaster</span>
                </div>
            </Header>

            <main
                className='min-h-screen flex items-center
                 justify-center'>
                <section className='min-w-72 xl:min-w-sm'>
                    <Outlet />
                </section>
            </main>
        </div>
    );
}

export default AuthRoutes;
