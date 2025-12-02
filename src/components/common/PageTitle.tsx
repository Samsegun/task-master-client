import clsx from "clsx";
import type { ReactNode } from "react";

interface PageTitleProps {
    children: ReactNode;
    className?: string;
}

function PageTitle({ children, className }: PageTitleProps) {
    return (
        <h1
            className={clsx(
                `text-xl md:text-2xl xl:text-3xl font-bold tracking-wide`,
                className
            )}>
            {children}
        </h1>
    );
}

export default PageTitle;
