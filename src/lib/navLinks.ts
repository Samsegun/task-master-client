import type { LucideIcon } from "lucide-react";
import { FolderDot, Home, SquareCheck } from "lucide-react";

interface NavLinkConfig {
    to: string;
    label: string;
    Icon: LucideIcon;
}

export const navLinks: NavLinkConfig[] = [
    {
        to: "/dashboard",
        label: "Home",
        Icon: Home,
    },
    {
        to: "/tasks",
        label: "My Tasks",
        Icon: SquareCheck,
    },
    {
        to: "/projects",
        label: "Projects",
        Icon: FolderDot,
    },
    //   {
    //     to: "/settings",
    //     label: "Settings",
    //     Icon: Settings,
    //   },
];

export const navLinksBaseClasses =
    "flex items-center gap-4 p-2 rounded-lg hover:bg-brand-link/70";
