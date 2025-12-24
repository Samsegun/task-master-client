import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useDialog } from "./DialogContext";

function DialogContent({
    children,
    height,
}: {
    children: ReactNode;
    height?: string;
}) {
    const { open, closeDialog } = useDialog();

    if (!open) return null;

    return createPortal(
        <>
            <div
                className={`fixed inset-0 h-full z-40 bg-black/40`}
                onClick={closeDialog}
                aria-hidden='true'
            />
            <div
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-lg max-h-[500px] lg:max-h-[700px] overflow-y-auto bg-brand-modal
              z-50 rounded-xl shadow-2xl ${
                  height ? `h-[${height}]` : "h-[85vh]"
              } `}
                onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </>,
        document.body
    );
}

export default DialogContent;
