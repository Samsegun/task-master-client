import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { useLocation } from "react-router";

interface MenuContextProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
}

export interface MenuProviderProps {
    children: ReactNode;
    initialOpen?: boolean;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const MenuProvider: React.FC<MenuProviderProps> = ({
    children,
    initialOpen = false,
}) => {
    const [isOpen, setIsOpen] = useState(initialOpen);
    const location = useLocation();

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const toggle = () => setIsOpen(prev => !prev);

    useEffect(() => {
        if (isOpen) onClose();
    }, [location.pathname]);

    return (
        <MenuContext.Provider value={{ isOpen, onOpen, onClose, toggle }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error("useMenu must be used within a MenuProvider");
    }
    return context;
};
