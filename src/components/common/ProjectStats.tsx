import type { ReactNode } from "react";

function Stats({ children }: { children: ReactNode }) {
    return (
        <article
            className='bg-brand-card rounded-lg p-4 border hover:border-brand-gray
                    border-nav-border transition-all'>
            {children}
        </article>
    );
}

function StatsTitle({ children }: { children: ReactNode }) {
    return <h2 className='text-navlink text-sm mb-4'>{children}</h2>;
}

export { Stats, StatsTitle };
