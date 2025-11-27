import { navLinks, navLinksBaseClasses } from "@/lib/navLinks";
import { PanelLeft } from "lucide-react";
import { Link, NavLink } from "react-router";
import Avatar from "../common/Avatar";
import Button from "../common/Button";
import Header from "../common/Header";
import Logo from "../common/Logo";

function Sidebar() {
    return (
        <div
            className='hidden md:flex flex-col bg-brand-sidebar 
        fixed left-0 top-0 h-screen w-60 xl:w-80'>
            <Header>
                <div>
                    <Link to={"/"} className='flex items-center'>
                        <Logo />

                        <span className='text-xl font-bold'>TaskMaster</span>
                    </Link>
                </div>

                <PanelLeft />
            </Header>

            <aside className='flex-1 overflow-y-auto p-4 md:pt-6 xl:p-8 flex flex-col justify-between'>
                <div className='space-y-4'>
                    <Avatar
                        name='Sophia willson'
                        occupation='product manager'
                        src='xxxxx'
                    />

                    <nav className='space-y-7'>
                        {navLinks.map(({ Icon, label, to }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) =>
                                    `
                    ${navLinksBaseClasses}
                     ${isActive ? "bg-brand-link/50" : ""}
                        `
                                }>
                                <Icon className='text-brand-link' />
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <Button type='button' variant={"primary"} className='w-full'>
                    New Project
                </Button>
            </aside>
        </div>
    );
}

export default Sidebar;
