import type { ReactNode } from "react";
import DialogContent from "./DialogContent";
import { DialogProvider } from "./DialogContext";
import DialogTrigger from "./DialogTrigger";

type DialogProps = {
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    // keep any other props your component used previously
};

function Dialog({ children, open, onOpenChange }: DialogProps) {
    return (
        <DialogProvider open={open} onOpenChange={onOpenChange}>
            {children}
        </DialogProvider>
    );
}

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;

export { Dialog };
