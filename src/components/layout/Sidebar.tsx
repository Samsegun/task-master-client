import type { AuthStatus } from "@/lib/apiTypes";
import { navLinks, navLinksBaseClasses } from "@/lib/navLinks";
import { nonUserRoles } from "@/lib/utils";
import { useModalStore } from "@/store/useModalStore";
import { PanelLeft, PanelRight, Plus } from "lucide-react";
import { useMemo } from "react";
import { Link, NavLink } from "react-router";
import Button from "../common/Button";
import Logo from "../common/Logo";

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
    user: AuthStatus["data"] | null;
}

function Sidebar({ isCollapsed, setIsCollapsed, user }: SidebarProps) {
    const openModal = useModalStore((state) => state.openModal);
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
        <aside
            className={`hidden md:flex flex-col bg-brand-sidebar
        fixed left-0 top-0 h-screen border-r border-nav-border
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-20" : "w-60 xl:w-64"}
        `}
        >
            {/* header */}
            <header
                className="p-4
            "
            >
                <div
                    className={`container mx-auto flex
            items-center gap-2 ${
                isCollapsed ? "justify-center" : "justify-between"
            }`}
                >
                    {!isCollapsed && (
                        <Link to={"/dashboard"} className="flex items-center">
                            <Logo />

                            <span className="text-lg xl:text-xl font-bold">
                                TaskMaster
                            </span>
                        </Link>
                    )}

                    <Button
                        aria-label="toggle navbar"
                        variant={"transparent"}
                        className="hover:cursor-w-resize"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? <PanelRight /> : <PanelLeft />}
                    </Button>
                </div>
            </header>

            {/* nav and create-project button */}
            <div
                className="flex-1 overflow-y-hidden p-4 md:pt-6
             flex flex-col justify-between lg:py-8"
            >
                <div className="space-y-4">
                    <nav className="space-y-7">
                        {/* {navLinks.map(({ Icon, label, to }) => ( */}
                        {visibleNavLinks.map(({ Icon, label, to }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `
                    ${navLinksBaseClasses}
                     ${isActive ? "bg-brand-link/50" : ""} ${
                         isCollapsed ? "justify-center" : ""
                     }
                        `
                                }
                                title={isCollapsed ? label : ""}
                            >
                                <Icon className="text-brand-link" size={20} />

                                {!isCollapsed && <span>{label}</span>}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <Button
                    variant={"primary"}
                    className={`flex items-center gap-2 ${
                        isCollapsed ? "" : "justify-center"
                    }`}
                    onClick={() => openModal("createProject")}
                >
                    <Plus size={30} />

                    {!isCollapsed && <span>New Project</span>}
                </Button>
            </div>
        </aside>
    );
}

export default Sidebar;
