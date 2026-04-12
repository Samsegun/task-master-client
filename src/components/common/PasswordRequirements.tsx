import { X } from "lucide-react";

function PasswordRequirements({
    setShowPasswordReqs,
}: {
    setShowPasswordReqs: (v: boolean) => void;
}) {
    return (
        <div className='bg-brand-modal font-semibold mt-2 p-4'>
            <div className='text-right'>
                <button
                    type='button'
                    aria-label='Hide password requirements'
                    className='hover:cursor-pointer'
                    onClick={() => setShowPasswordReqs(false)}>
                    <X />
                </button>
            </div>

            <div className='font-bold text-sm italic tracking-wide'>
                <ul>
                    <li>- At least 8 characters</li>
                    <li>- An uppercase letter</li>
                    <li>- A lowercase letter</li>
                    <li>- A number</li>
                    <li>- At least one special character</li>
                </ul>
            </div>
        </div>
    );
}

export default PasswordRequirements;
