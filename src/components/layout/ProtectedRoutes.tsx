// import { useAuthStatus } from "@/hooks/useAuth";
import { useState } from "react";
import { Outlet } from "react-router";
// import ClaudeSidebar from "./ClaudeSidebar";
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
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className=''>
            <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <div
                className={`min-h-screen p-6 mt-18  
            md:mt-0 md:pt-8 xl:px-10 transition-all duration-300 ease-in-out ${
                isCollapsed ? "ml-20" : "md:ml-60 xl:ml-80"
            }`}>
                <main className='max-w-7xl mx-auto'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default ProtectedRoutes;
