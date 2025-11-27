// import { useAuthStatus } from "@/hooks/useAuth";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
// import LoadingIcon from "./LoadingIcon";

function ProtectedRoutes() {
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
        <div className=''>
            <Navbar />

            <main className='min-h-screen p-4 mt-18 md:ml-60 md:mt-0 md:pt-8 xl:ml-80'>
                <Outlet />
            </main>
        </div>
    );
}

export default ProtectedRoutes;
