import { navLinks, navLinksBaseClasses } from "@/lib/navLinks";
import { Menu as MenuIcon, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import Avatar from "../common/Avatar";
import Header from "../common/Header";
import Logo from "../common/Logo";
import { Menu } from "../Menu/Menu";

function TopBar() {
    return (
        <Header className='block md:hidden bg-brand-bg fixed top-0 left-0 right-0 z-50'>
            <div>
                <Link to={"/dashboard"} className='flex items-center'>
                    <Logo />

                    <span className='text-xl font-bold'>TaskMaster</span>
                </Link>
            </div>

            <Menu>
                <div>
                    <Menu.Trigger>
                        <MenuIcon />
                    </Menu.Trigger>

                    <Menu.Content direction='right'>
                        <div
                            className='p-4 bg-brand-sidebar flex flex-col h-screen
                     border-l-4 border-nav-border'>
                            <Menu.Trigger className='w-16 ml-auto'>
                                <X size={30} />
                            </Menu.Trigger>

                            <div
                                className='flex-1 overflow-y-hidden p-4 md:pt-6 
             flex flex-col justify-between'>
                                <div className='space-y-10'>
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
                                                ${
                                                    isActive
                                                        ? "bg-brand-link/50"
                                                        : ""
                                                } 
                                                `
                                                }
                                                title={label}>
                                                <Icon
                                                    className='text-brand-link'
                                                    size={20}
                                                />

                                                <span>{label}</span>
                                            </NavLink>
                                        ))}
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
