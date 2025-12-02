import clsx from "clsx";
import type { ReactNode } from "react";

interface HeaderProps {
    children: ReactNode;
    className?: string;
}

function Header({ children, className }: HeaderProps) {
    return (
        <header
            className={clsx(
                `p-4 sm:px-6 lg:px-8 
            border-b border-nav-border`,
                className
            )}>
            <div
                className='container mx-auto flex justify-between 
            items-center md:justify-center xl:justify-between'>
                {children}
            </div>
        </header>
    );
}

export default Header;
