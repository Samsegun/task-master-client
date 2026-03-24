import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

interface DialogContextType {
    open: boolean;
    openDialog: () => void;
    closeDialog: () => void;
    setOpen: (v: boolean) => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider: React.FC<{
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}> = ({ children, open: controlledOpen, onOpenChange }) => {
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState<boolean>(
        controlledOpen ?? false
    );

    // keep internal state in sync when parent toggles controlledOpen
    useEffect(() => {
        if (controlledOpen !== undefined) setInternalOpen(controlledOpen);
    }, [controlledOpen]);

    const open = isControlled ? !!controlledOpen : internalOpen;

    const setOpen = (v: boolean) => {
        if (isControlled) {
            onOpenChange?.(v);
        } else {
            setInternalOpen(v);
        }
    };

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    return (
        <DialogContext.Provider
            value={{
                open,
                openDialog,
                closeDialog,
                setOpen,
            }}>
            {children}
        </DialogContext.Provider>
    );
};

export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context)
        throw new Error("useDialog must be used inside DialogProvider");
    return context;
};
