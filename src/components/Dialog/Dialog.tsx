import type { ReactNode } from "react";
import DialogContent from "./DialogContent";
import { DialogProvider } from "./DialogContext";
import DialogTrigger from "./DialogTrigger";

function Dialog({ children }: { children: ReactNode }) {
    return <DialogProvider>{children}</DialogProvider>;
}

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;

export { Dialog };
