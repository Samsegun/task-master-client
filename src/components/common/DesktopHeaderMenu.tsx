import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Avatar from "./Avatar";
import PageTitle from "./PageTitle";

type User =
    | {
          id: string;
          email: string;
          username: string;
          role: "USER" | "MODERATOR" | "ADMIN" | "SUPER_ADMIN";
          isVerified: boolean;
          firstName: string;
          lasttName: string;
      }
    | undefined;

function DesktopHeaderMenu({
    user,
    logout,
}: {
    user: User;
    logout: () => void;
}) {
    const navigate = useNavigate();

    function handleNav() {
        // without this delay, DropdownMenuContent flashes before closing
        // tried all sorts but this approach works for now
        setTimeout(() => {
            navigate("/profile");
        }, 350);
    }

    return (
        <div className='flex justify-between items-center px-6 xl:px-3 max-w-5xl mx-auto'>
            <PageTitle>
                Good morning,{" "}
                <span className='capitalize'>{user?.username}</span>
            </PageTitle>

            <div className='hidden md:block'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='cursor-pointer'>
                        <div>
                            <Avatar
                                name={user?.username || "User"}
                                occupation='product manager'
                                src='xxxxx'
                            />
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className='bg-brand-sidebar border-nav-border text-brand-primary'>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>

                        <DropdownMenuSeparator className='bg-nav-border' />

                        <div className='mt-2 space-y-2'>
                            <DropdownMenuItem
                                className='cursor-pointer'
                                onSelect={handleNav}>
                                Profile
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className='cursor-pointer text-destructive'
                                onSelect={logout}>
                                <span>Logout</span> <LogOutIcon />
                            </DropdownMenuItem>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default DesktopHeaderMenu;
