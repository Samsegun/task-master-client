import clsx from "clsx";
import type { ReactNode } from "react";
import {
    TableCell as ShadcnTableCell,
    TableHead as ShadcnTableHead,
} from "../ui/table";

interface TableHeadProps {
    children: ReactNode;
    className?: string;
}

export function TableHead({ children, className }: TableHeadProps) {
    return (
        <ShadcnTableHead
            className={clsx(
                `text-brand-card-header p-4 capitalize`,
                className
            )}>
            {children}
        </ShadcnTableHead>
    );
}

export function TableCell({ children, className }: TableHeadProps) {
    return (
        <ShadcnTableCell className={clsx(`text-brand-primary p-4`, className)}>
            {children}
        </ShadcnTableCell>
    );
}
