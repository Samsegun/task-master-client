import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function Navbar() {
    return (
        <>
            {/* mobile topbar */}
            <TopBar />

            {/* tablet/desktop sidebar */}
            <Sidebar />
        </>
    );
}

export default Navbar;
