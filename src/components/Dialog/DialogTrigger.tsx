import type { ReactNode } from "react";
import type { ButtonProps } from "../common/Button";
import Button from "../common/Button";
import { useDialog } from "./DialogContext";

interface DialogTriggerProps {
    children: ReactNode;
    variant?: ButtonProps["variant"];
    className?: string;
}

function DialogTrigger({ children, variant, className }: DialogTriggerProps) {
    const { openDialog } = useDialog();

    return (
        <Button
            variant={variant}
            type='button'
            onClick={openDialog}
            aria-expanded={false}
            className={className}>
            {children}
        </Button>
    );
    // return <div onClick={openDialog}>{children}</div>;
}

export default DialogTrigger;
