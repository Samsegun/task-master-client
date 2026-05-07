import { MenuContent } from "./MenuContent";
import { MenuProvider, type MenuProviderProps } from "./MenuContext";
import { MenuTrigger } from "./MenuTrigger";

// const Menu: React.FC<MenuProviderProps> & {
//     Trigger: React.FC<MenuTriggerProps>;
//     Content: React.FC<MenuContentProps>;
// } = ({ children }) => {
//     return <MenuProvider>{children}</MenuProvider>;
// };
function Menu({ children }: MenuProviderProps) {
    return <MenuProvider>{children}</MenuProvider>;
}

Menu.Trigger = MenuTrigger;
Menu.Content = MenuContent;

export { Menu };
