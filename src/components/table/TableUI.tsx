import type { ComponentProps } from "react";

import clsx from "clsx";
import type { ReactNode } from "react";
import {
    TableCell as ShadcnTableCell,
    TableHead as ShadcnTableHead,
} from "../ui/table";

interface TableHeadProps extends ComponentProps<"th"> {
    children: ReactNode;
    className?: string;
}

interface TableCellProps extends ComponentProps<"td"> {
    children: ReactNode;
    className?: string;
}

export function TableHead({ children, className, ...props }: TableHeadProps) {
    return (
        <ShadcnTableHead
            className={clsx(`text-brand-card-header p-4 capitalize`, className)}
            {...props}>
            {children}
        </ShadcnTableHead>
    );
}

export function TableCell({ children, className, ...props }: TableCellProps) {
    return (
        <ShadcnTableCell
            className={clsx(`text-brand-primary p-4`, className)}
            {...props}>
            {children}
        </ShadcnTableCell>
    );
}
