import type { ReactNode } from "react";

function FormWrapper({ children }: { children: ReactNode }) {
    return (
        <div className='bg-brand-modal p-4 md:p-6 lg:py-6 lg:px-10 rounded-lg border border-nav-border'>
            {children}
        </div>
    );
}

function LabelInputWrapper({ children }: { children: ReactNode }) {
    return (
        <div className='flex flex-col gap-3 md:flex-row w-4/5'>{children}</div>
    );
}

function InputWrapper({ children }: { children: ReactNode }) {
    return <div className='relative basis-8/12 xl:basis-1/2'>{children}</div>;
}

export { FormWrapper, InputWrapper, LabelInputWrapper };
