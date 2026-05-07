import type { ProjectStatus, Statuses, TaskStatus } from "@/lib/types";
import type { Dispatch, SetStateAction } from "react";
import Button from "./Button";

interface TabsProps {
    activeTab: "all" | ProjectStatus | TaskStatus;
    setActiveTab: Dispatch<SetStateAction<Statuses>>;
    statusList: Statuses[];
}

function Tabs({ activeTab, setActiveTab, statusList }: TabsProps) {
    return (
        <section>
            {/* for mobile */}
            <div className='block md:hidden'>
                <select
                    value={activeTab}
                    onChange={e => setActiveTab(e.target.value as any)}
                    className='w-full px-4 py-2 rounded-lg bg-brand-sidebar capitalize'>
                    {statusList.map(tab => (
                        <option key={tab} value={tab}>
                            {tab}
                        </option>
                    ))}
                </select>
            </div>

            {/* for desktop */}
            <div className='hidden md:flex gap-4 mb-6'>
                {statusList.map(tab => (
                    <Button
                        type='button'
                        key={tab}
                        variant={activeTab === tab ? "primary" : "inactive"}
                        onClick={() => setActiveTab(tab as Statuses)}
                        className={`px-4 py-2 rounded-lg capitalize transition-colors`}>
                        {tab.toLowerCase().replace("_", " ")}
                    </Button>
                ))}
            </div>
        </section>
    );
}

export default Tabs;
