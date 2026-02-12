import { LoaderCircle } from "lucide-react";

function LoadingIcon() {
    return (
        <div className='h-screen flex justify-center items-center mt-12'>
            <LoaderCircle size={56} className='animate-spin' />
        </div>
    );
}

export default LoadingIcon;
