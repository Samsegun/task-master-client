import type { ProjectStatus } from "@/lib/types";
import type { Dispatch, SetStateAction } from "react";
import Button from "./Button";

interface TabsProps {
    activeTab: "all" | ProjectStatus;
    setActiveTab: Dispatch<SetStateAction<ProjectStatus | "all">>;
}

function Tabs({ activeTab, setActiveTab }: TabsProps) {
    return (
        <section className='mb-6 md:mb-10'>
            {/* for Mobile */}
            <div className='block md:hidden'>
                <select
                    value={activeTab}
                    onChange={e => setActiveTab(e.target.value as any)}
                    className='w-full px-4 py-2 rounded-lg bg-brand-sidebar capitalize'>
                    {["all", "ACTIVE", "COMPLETED", "ARCHIVED"].map(tab => (
                        <option key={tab} value={tab}>
                            {tab}
                        </option>
                    ))}
                </select>
            </div>

            {/* for desktop */}
            <div className='hidden md:flex gap-4 mb-6'>
                {["all", "ACTIVE", "COMPLETED", "ARCHIVED"].map(tab => (
                    <Button
                        type='button'
                        key={tab}
                        variant={activeTab === tab ? "primary" : "inactive"}
                        onClick={() =>
                            setActiveTab(tab as ProjectStatus | "all")
                        }
                        className={`px-4 py-2 rounded-lg capitalize transition-colors`}>
                        {tab}
                    </Button>
                ))}
            </div>
        </section>
    );
}

export default Tabs;
