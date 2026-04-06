import { useAuthStatus } from "@/hooks/useAuth";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router";
import Avatar from "../common/Avatar";
import Button from "../common/Button";
import LoadingIcon from "../common/LoadingIcon";
import PageTitle from "../common/PageTitle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Navbar from "./Navbar";

function ProtectedRoutes() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { isLoading, isAuthenticated, isError, logout } = useAuthStatus();
    const location = useLocation();

    if (isLoading) {
        return <LoadingIcon />;
    }

    if (!isAuthenticated || isError) {
        return <Navigate to={"/login"} state={{ from: location }} replace />;
    }

    return (
        <div>
            <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <div
                className={`min-h-screen mt-18 
            md:mt-0 p-6 xl:px-10 transition-all duration-300 ease-in-out ${
                isCollapsed ? "ml-20" : "md:ml-60 xl:ml-64"
            }`}>
                <div className='relative max-w-7xl mx-auto lg:px-4 space-y-10 xl:space-y-12'>
                    <div
                        className='hidden md:block sticky top-0 z-50 py-4 px-1 backdrop-blur-md bg-white/5 shadow-sm'
                        style={{
                            WebkitBackdropFilter: "blur(8px)",
                            backdropFilter: "blur(8px)",
                        }}>
                        <div className='flex justify-between items-center'>
                            <PageTitle>Good morning, Sophia</PageTitle>

                            <div className='hidden md:block'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='cursor-pointer'>
                                        <div>
                                            <Avatar
                                                name='Sophia willson'
                                                occupation='product manager'
                                                src='xxxxx'
                                            />
                                        </div>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>
                                            My Account
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link
                                                to={"/profile"}
                                                className='flex basis-full'>
                                                Profile
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem>
                                            <Button
                                                onClick={() => logout.mutate()}
                                                variant={"transparent"}
                                                className='hover:text-red-500 flex gap-2'>
                                                <span>Logout</span>{" "}
                                                <LogOutIcon />
                                            </Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>

                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default ProtectedRoutes;
