import type { ReactNode } from "react";
import { DialogContent } from "../ui/dialog";

function FormContentWrapper({ children }: { children: ReactNode }) {
    return (
        <DialogContent
            className='bg-brand-modal max-h-[500px] lg:max-h-[552px] overflow-y-auto
     rounded-lg border border-nav-border'>
            {children}
        </DialogContent>
    );
}

export default FormContentWrapper;
