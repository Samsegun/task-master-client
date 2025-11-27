import { Menu } from "lucide-react";
import { Link } from "react-router";
import Header from "../common/Header";
import Logo from "../common/Logo";

function TopBar() {
    return (
        <Header className='block md:hidden bg-brand-bg fixed top-0 left-0 right-0'>
            <div>
                <Link to={"/dashboard"} className='flex items-center'>
                    <Logo />

                    <span className='text-xl font-bold'>TaskMaster</span>
                </Link>
            </div>

            <Menu />
        </Header>
    );
}

export default TopBar;
