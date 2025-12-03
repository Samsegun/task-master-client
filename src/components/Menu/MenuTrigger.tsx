import React, { type ReactNode } from "react";
import Button from "../common/Button";
import { useMenu } from "./MenuContext";

export interface MenuTriggerProps {
    children: ReactNode;
    className?: string;
}

export const MenuTrigger: React.FC<MenuTriggerProps> = ({
    children,
    className,
}) => {
    const { toggle } = useMenu();

    return (
        <Button
            variant={"transparent"}
            type='button'
            onClick={toggle}
            aria-expanded={false}
            className={className}>
            {children}
        </Button>
    );
};
