import { Check } from "lucide-react";

function VerificationEmailSent() {
    return (
        <div className='mx-auto max-w-11/12'>
            <div className='text-center'>
                <h1 className='flex justify-center items-center gap-2 text-3xl font-extrabold'>
                    <span> Email Verification sent</span>{" "}
                    <span>
                        <Check size={30} className='text-brand-button' />
                    </span>
                </h1>
            </div>

            <section className='mt-8 flex justify-center items-center'>
                <h2 className='font-bold text-xl text-center'>
                    A verification mail has been sent. Please check your email
                    or spam box.
                </h2>
            </section>
        </div>
    );
}

export default VerificationEmailSent;
