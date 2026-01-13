// import { useAuthStatus } from "@/hooks/useAuth";
import { useAuthStatus } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";
import Header from "../common/Header";
import Logo from "../common/Logo";
// import LoadingIcon from "./LoadingIcon";

function AuthRoutes() {
    const { isAuthenticated, isLoading } = useAuthStatus();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <p>Verifying Session...</p>
            </div>
        );
    }

    // if the query finishes and no user is found, redirect
    if (!isAuthenticated) {
        return <Navigate to='/login' state={{ from: location }} replace />;
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
