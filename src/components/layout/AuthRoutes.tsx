// import { useAuthStatus } from "@/hooks/useAuth";
import { Outlet } from "react-router";
import Header from "../common/Header";
import Logo from "../common/Logo";
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
