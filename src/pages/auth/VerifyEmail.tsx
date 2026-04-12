import Button from "@/components/common/Button";
import { useVerifyEmail } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const verifyEmailMutation = useVerifyEmail();

    const token = searchParams.get("token");

    function verifyEmail() {
        if (!token) {
            toast.error("Invalid or missing verification details parameters");
            return;
        }

        verifyEmailMutation.mutate({ token });
    }

    return (
        <div className='text-center'>
            <h1 className='text-3xl font-extrabold'>Verify your Email</h1>

            <section className='flex justify-center mt-5'>
                <Button
                    className=''
                    disabled={verifyEmailMutation.isPending}
                    variant={"primary"}
                    onClick={verifyEmail}>
                    {verifyEmailMutation.isPending
                        ? "Verifying Email..."
                        : "Click here to verify your Email"}
                </Button>
            </section>
        </div>
    );
}

export default VerifyEmail;
