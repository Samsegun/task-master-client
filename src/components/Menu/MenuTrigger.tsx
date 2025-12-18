import React, { type ReactNode } from "react";
import Button, { type ButtonProps } from "../common/Button";
import { useMenu } from "./MenuContext";

export interface MenuTriggerProps {
    children: ReactNode;
    className?: string;
    variant?: ButtonProps["variant"];
}

export const MenuTrigger: React.FC<MenuTriggerProps> = ({
    children,
    className,
    variant = "transparent",
}) => {
    const { toggle } = useMenu();

    return (
        <Button
            variant={variant}
            type='button'
            onClick={toggle}
            aria-expanded={false}
            className={className}>
            {children}
        </Button>
    );
};
