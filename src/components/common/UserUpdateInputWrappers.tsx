import type { ReactNode } from "react";

function LabelInputWrapper({ children }: { children: ReactNode }) {
    return (
        <div className='flex flex-col gap-3 md:flex-row w-4/5'>{children}</div>
    );
}

function InputWrapper({ children }: { children: ReactNode }) {
    return <div className='basis-8/12 xl:basis-1/2'>{children}</div>;
}

export { InputWrapper, LabelInputWrapper };
