import { useAuthStatus } from "@/hooks/useAuth";
import { useState } from "react";
import { Navigate, Outlet, ScrollRestoration, useLocation } from "react-router";
import DesktopHeaderMenu from "../common/DesktopHeaderMenu";
import LoadingIcon from "../common/LoadingIcon";
import Navbar from "./Navbar";

function RootLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { isLoading, isAuthenticated, isError, logout, user } =
        useAuthStatus();
    const location = useLocation();

    if (isLoading) {
        return <LoadingIcon />;
    }

    if (!isAuthenticated || isError) {
        return <Navigate to={"/login"} state={{ from: location }} replace />;
    }

    return (
        <div>
            <ScrollRestoration />

            <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <div
                className={`relative min-h-screen  transition-all duration-300 ease-in-out ${
                    isCollapsed ? "ml-20" : "md:ml-60 xl:ml-64"
                }`}>
                <div>
                    <div
                        className='sticky hidden md:block left-0 right-0 top-0 z-50 py-4.5
                         backdrop-blur-md bg-white/4 shadow-sm border-b border-nav-border'
                        style={{
                            WebkitBackdropFilter: "blur(8px)",
                            backdropFilter: "blur(8px)",
                        }}>
                        <DesktopHeaderMenu
                            user={user}
                            logout={() => logout.mutate()}
                        />
                    </div>

                    <div
                        className='mt-18 
            md:mt-0 py-6 md:py-8 xl:py-10 px-8'>
                        <main className='max-w-4xl mx-auto lg:px-8 space-y-10 xl:space-y-12 '>
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RootLayout;
