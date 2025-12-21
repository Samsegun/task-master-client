import React, { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useMenu } from "./MenuContext";

export interface MenuContentProps {
    children: ReactNode;
    direction: "right" | "center";
    height?: string;
}

export const MenuContent: React.FC<MenuContentProps> = ({
    children,
    direction,
    height,
}) => {
    const { isOpen, onClose } = useMenu();

    const contentClasses =
        direction === "right"
            ? `fixed inset-y-0 right-0 w-80 max-w-full bg-white z-50 transform transition-transform ease-in-out duration-300`
            : `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-lg max-h-[500px] lg:max-h-[700px] overflow-y-auto bg-brand-modal
              z-50 rounded-xl shadow-2xl transform transition-all ease-in-out duration-300 ${
                  height ? `h-[${height}]` : "h-[85vh]"
              }`;

    const transitionClass =
        direction === "right"
            ? isOpen
                ? "translate-x-0 opacity-100 visible"
                : "translate-x-full opacity-0 invisible"
            : isOpen
            ? "scale-100 opacity-100 visible"
            : "scale-95 opacity-0 invisible";

    return createPortal(
        <>
            <div
                className={`fixed inset-0 h-full z-30 transition-opacity duration-300 ${
                    isOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                style={{
                    backgroundColor:
                        direction === "right"
                            ? "transparent"
                            : "rgba(0, 0, 0, 0.4)",
                }}
                onClick={onClose}
                aria-hidden='true'
            />

            <div
                className={`${contentClasses} ${transitionClass} flex flex-col`}>
                {children}
            </div>
        </>,
        document.body
    );
};
