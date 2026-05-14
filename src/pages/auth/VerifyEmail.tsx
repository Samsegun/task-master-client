import Button from "@/components/common/Button";
import { useVerifyEmail } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const verifyEmailMutation = useVerifyEmail();

    const verificationToken = searchParams.get("token");
    const invitationToken = searchParams.get("invitationToken");

    function verifyMail() {
        if (!verificationToken) {
            toast.error("Invalid or missing verification details parameters");
            return;
        }

        verifyEmailMutation.mutate({
            token: verificationToken,
            invitationToken,
        });
    }

    return (
        <div className="text-center">
            <h1 className="text-3xl font-extrabold">Verify your Email</h1>

            <section className="flex justify-center mt-5">
                <Button
                    className=""
                    disabled={verifyEmailMutation.isPending}
                    variant={"primary"}
                    onClick={verifyMail}
                >
                    {verifyEmailMutation.isPending
                        ? "Verifying Email..."
                        : "Click here to verify your Email"}
                </Button>
            </section>
        </div>
    );
}

export default VerifyEmail;
