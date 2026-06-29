import type { AuthStatus } from "@/lib/apiTypes";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface NavbarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
    user: AuthStatus["data"] | null;
    onLogout: () => void;
}

function Navbar({ isCollapsed, setIsCollapsed, user, onLogout }: NavbarProps) {
    return (
        <>
            {/* mobile topbar */}
            <TopBar user={user} onLogout={onLogout} />

            {/* tablet/desktop sidebar */}
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                user={user}
            />
        </>
    );
}

export default Navbar;
