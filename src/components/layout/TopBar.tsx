import type { AuthStatus } from "@/lib/apiTypes";
import { navLinks, navLinksBaseClasses } from "@/lib/navLinks";
import { nonUserRoles } from "@/lib/utils";
import { LogOutIcon, Menu as MenuIcon, X } from "lucide-react";
import { useMemo } from "react";
import { Link, NavLink } from "react-router";
import Button from "../common/Button";
import Header from "../common/Header";
import Logo from "../common/Logo";
import { Menu } from "../Menu/Menu";

interface TopBarProps {
    user: AuthStatus["data"] | null;
    onLogout: () => void;
}

function TopBar({ user, onLogout }: TopBarProps) {
    const visibleNavLinks = useMemo(
        () =>
            navLinks.filter((link) =>
                link.to === "/admin/users"
                    ? user?.role && nonUserRoles.includes(user.role)
                    : true,
            ),
        [user],
    );

    return (
        <Header
            className="block md:hidden fixed top-0 left-0 right-0 z-50
        backdrop-blur-md bg-white/4"
        >
            <div>
                <Link to={"/dashboard"} className="flex items-center">
                    <Logo />

                    <span className="text-xl font-bold">TaskMaster</span>
                </Link>
            </div>

            <Menu>
                <div>
                    <Menu.Trigger>
                        <MenuIcon />
                    </Menu.Trigger>

                    <Menu.Content direction="right">
                        <div
                            className="p-4 bg-brand-sidebar flex flex-col h-screen
                     border-l-4 border-nav-border"
                        >
                            <Menu.Trigger className="w-16 ml-auto">
                                <X size={30} />
                            </Menu.Trigger>

                            <div
                                className="flex-1 overflow-y-hidden p-4 md:pt-6
             flex flex-col justify-between"
                            >
                                <div className="space-y-10">
                                    <nav className="space-y-7">
                                        {visibleNavLinks.map(
                                            ({ Icon, label, to }) => (
                                                <NavLink
                                                    key={to}
                                                    to={to}
                                                    className={({ isActive }) =>
                                                        `
                                                ${navLinksBaseClasses}
                                                ${
                                                    isActive
                                                        ? "bg-brand-link/50"
                                                        : ""
                                                }
                                                `
                                                    }
                                                    title={label}
                                                >
                                                    <Icon
                                                        className="text-brand-link"
                                                        size={20}
                                                    />

                                                    <span>{label}</span>
                                                </NavLink>
                                            ),
                                        )}

                                        <Button
                                            onClick={onLogout}
                                            variant={"transparent"}
                                            className="text-red-500 flex gap-2"
                                        >
                                            <span>Logout</span> <LogOutIcon />
                                        </Button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </Menu.Content>
                </div>
            </Menu>
        </Header>
    );
}

export default TopBar;
