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
                        <div className='flex justify-between items-center px-6 xl:px-3 max-w-5xl mx-auto'>
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

                    <div
                        className='mt-18 
            md:mt-0 py-6 px-8'>
                        <main className='max-w-4xl mx-auto lg:px-8 space-y-10 xl:space-y-12 '>
                            <Outlet />
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProtectedRoutes;
