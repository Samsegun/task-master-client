import { useAuthStatus } from "@/hooks/useAuth";
import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import LoadingIcon from "../common/LoadingIcon";
import Navbar from "./Navbar";

function ProtectedRoutes() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { isLoading, isAuthenticated, isError } = useAuthStatus();
    const location = useLocation();

    if (isLoading) {
        return <LoadingIcon />;
    }

    if (!isAuthenticated || isError) {
        return <Navigate to={"/login"} state={{ from: location }} replace />;
    }

    return (
        <div className=''>
            <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <div
                className={`min-h-screen p-6 mt-18 
            md:mt-0 xl:px-10 transition-all duration-300 ease-in-out ${
                isCollapsed ? "ml-20" : "md:ml-60 xl:ml-64"
            }`}>
                <main className='max-w-7xl mx-auto lg:p-4'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default ProtectedRoutes;
