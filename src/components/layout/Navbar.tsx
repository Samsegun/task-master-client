import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

function Navbar({ isCollapsed, setIsCollapsed }: SidebarProps) {
    return (
        <>
            {/* mobile topbar */}
            <TopBar />

            {/* tablet/desktop sidebar */}
            <Sidebar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
        </>
    );
}

export default Navbar;
