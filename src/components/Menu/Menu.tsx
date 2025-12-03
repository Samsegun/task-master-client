import React, { type ReactNode } from "react";
import { MenuContent, type MenuContentProps } from "./MenuContent";
import { MenuProvider } from "./MenuContext";
import { MenuTrigger, type MenuTriggerProps } from "./MenuTrigger";

interface MenuProps {
    children: ReactNode;
}

export const Menu: React.FC<MenuProps> & {
    Trigger: React.FC<MenuTriggerProps>;
    Content: React.FC<MenuContentProps>;
} = ({ children }) => {
    return <MenuProvider>{children}</MenuProvider>;
};

Menu.Trigger = MenuTrigger;

Menu.Content = MenuContent;
