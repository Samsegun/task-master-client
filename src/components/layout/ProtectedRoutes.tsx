// import { useAuthStatus } from "@/hooks/useAuth";
import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
// import ClaudeSidebar from "./ClaudeSidebar";
import { useAuthStatus } from "@/hooks/useAuth";
import Navbar from "./Navbar";
// import LoadingIcon from "./LoadingIcon";

function ProtectedRoutes() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { isLoading, isAuthenticated } = useAuthStatus();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <p className='text-2xl font-bold'>Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' state={{ from: location }} replace />;
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
