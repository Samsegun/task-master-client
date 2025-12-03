// MenuContent.tsx
import React, { type ReactNode } from "react";
import { useMenu } from "./MenuContext";

export interface MenuContentProps {
    children: ReactNode;
    direction: "right" | "center";
}

export const MenuContent: React.FC<MenuContentProps> = ({
    children,
    direction,
}) => {
    const { isOpen, onClose } = useMenu();

    // if (!isOpen) return null;

    const contentClasses =
        direction === "right"
            ? "fixed inset-y-0 right-0 w-80 max-w-full bg-white z-50 transform transition-transform ease-in-out duration-300"
            : "relative w-full max-w-lg mx-auto my-12 bg-white rounded-xl shadow-2xl z-50 transform transition-all ease-in-out duration-300";

    const transitionClass =
        direction === "right"
            ? isOpen
                ? "translate-x-0"
                : "translate-x-full"
            : isOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0";

    return (
        <>
            <div
                className={`fixed inset-0 z-40 transition-opacity duration-300 ${
                    isOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                style={{
                    backgroundColor:
                        direction === "right"
                            ? "transparent"
                            : "rgba(0, 0, 0, 0.4)",
                    // opacity: isOpen ? "1" : "0",
                    // pointerEvents: isOpen ? "auto" : "none",
                }}
                onClick={onClose}
                aria-hidden='true'
            />

            <div
                className={`${contentClasses} ${transitionClass} flex flex-col`}>
                {children}
            </div>
        </>
    );
};
