import { Link } from "react-router";

function NotFound() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen text-center'>
            <h1 className='text-4xl font-bold text-destructive'>404</h1>
            <p className='text-lg text-brand-gray mt-4'>Page Not Found</p>
            <Link
                to='/'
                className='mt-6 px-6 py-2 bg-brand-button rounded-md hover:bg-brand-button/90'>
                Go to Dashboard
            </Link>
        </div>
    );
}

export default NotFound;
