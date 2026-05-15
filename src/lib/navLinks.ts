import type { LucideIcon } from "lucide-react";
import {
    CheckSquare,
    CircleUserRound,
    FolderKanban,
    LayoutDashboard,
    Shield,
} from "lucide-react";

interface NavLinkConfig {
    to: string;
    label: string;
    Icon: LucideIcon;
}

export const navLinks: NavLinkConfig[] = [
    {
        to: "/dashboard",
        label: "Home",
        Icon: LayoutDashboard,
    },
    {
        to: "/tasks",
        label: "My Tasks",
        Icon: CheckSquare,
    },
    {
        to: "/projects",
        label: "Projects",
        Icon: FolderKanban,
    },
    {
        to: "/admin/users",
        label: "Admin",
        Icon: Shield,
    },
    {
        to: "/profile",
        label: "Profile",
        Icon: CircleUserRound,
    },
];

export const navLinksBaseClasses =
    "flex items-center gap-4 p-2 rounded-lg hover:bg-brand-link/70 transition-colors duration-200";
