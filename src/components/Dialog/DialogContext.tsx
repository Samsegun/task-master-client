import { createContext, useContext, useState, type ReactNode } from "react";

interface DialogContextType {
    open: boolean;
    openDialog: () => void;
    closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [open, setOpen] = useState(false);

    const openDialog = () => setOpen(true);
    const closeDialog = () => setOpen(false);

    return (
        <DialogContext.Provider
            value={{
                open,
                openDialog,
                closeDialog,
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
