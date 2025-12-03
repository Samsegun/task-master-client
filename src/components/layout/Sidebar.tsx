import { navLinks, navLinksBaseClasses } from "@/lib/navLinks";
import { PanelLeft, PanelRight, Plus } from "lucide-react";
import { Link, NavLink } from "react-router";
import Avatar from "../common/Avatar";
import Button from "../common/Button";
import Logo from "../common/Logo";

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
    return (
        <aside
            className={`hidden md:flex flex-col bg-brand-sidebar 
        fixed left-0 top-0 h-screen border-r border-nav-border 
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-20" : "w-60 xl:w-80"}
        `}>
            {/* header */}
            <header
                className='p-4  
            border-b border-nav-border'>
                <div
                    className={`container mx-auto flex 
            items-center gap-2 ${
                isCollapsed ? "justify-center" : "justify-between"
            }`}>
                    {!isCollapsed && (
                        <Link to={"/dashboard"} className='flex items-center'>
                            <Logo />

                            <span className='text-lg xl:text-xl font-bold'>
                                TaskMaster
                            </span>
                        </Link>
                    )}

                    <Button
                        aria-label='toggle navbar'
                        variant={"transparent"}
                        className='hover:cursor-w-resize'
                        onClick={() => setIsCollapsed(!isCollapsed)}>
                        {isCollapsed ? <PanelRight /> : <PanelLeft />}
                    </Button>
                </div>
            </header>

            {/* avatar, nav and create-project button */}
            <div
                className='flex-1 overflow-y-hidden p-4 md:pt-6 
             flex flex-col justify-between'>
                <div className='space-y-4'>
                    {!isCollapsed && (
                        <div>
                            <Avatar
                                name='Sophia willson'
                                occupation='product manager'
                                src='xxxxx'
                            />
                        </div>
                    )}

                    <nav className='space-y-7'>
                        {navLinks.map(({ Icon, label, to }) => (
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
                                title={isCollapsed ? label : ""}>
                                <Icon className='text-brand-link' size={20} />

                                {!isCollapsed && <span>{label}</span>}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <Button
                    type='button'
                    variant={"primary"}
                    className='w-full flex items-center gap-2'>
                    <Plus size={30} />

                    {!isCollapsed && <span>New Project</span>}
                </Button>
            </div>
        </aside>
    );
}

export default Sidebar;
