import Button from "@/components/common/Button";
import LoadingIcon from "@/components/common/LoadingIcon";
import PageTitle from "@/components/common/PageTitle";
import { useAuthStatus } from "@/hooks/useAuth";
import { useAcceptInvitation, useDeclineInvitation } from "@/hooks/useProjects";
import { useLocation, useNavigate, useSearchParams } from "react-router";

function ProcessInvitation() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || searchParams.get("invitation");

    const navigate = useNavigate();
    const location = useLocation();

    const { isAuthenticated, isLoading: isAuthLoading } = useAuthStatus();

    const acceptMutation = useAcceptInvitation();
    const declineMutation = useDeclineInvitation();

    if (!token) {
        return (
            <div className="min-h-screen flex justify-center items-center text-xl">
                <h1>Invalid or missing invitation link.</h1>
            </div>
        );
    }

    if (isAuthLoading) {
        return <LoadingIcon />;
    }

    function onAcceptInvitation() {
        if (!token) return;

        acceptMutation.mutate(token, {
            onSuccess: () => navigate("/"),
        });
    }

    function onDeclineInvitation() {
        if (!token) return;

        declineMutation.mutate(token, {
            onSuccess: () => navigate("/"),
        });
    }

    // 3. The "Return URL" pattern for unauthenticated users
    function handleAuthRedirect(type: "login" | "register") {
        const returnUrl = encodeURIComponent(
            location.pathname + location.search,
        );

        navigate(`/${type}?returnUrl=${returnUrl}`);
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <PageTitle>Process Project Invitation</PageTitle>

            {/* IF AUTHENTICATED: Show the Accept/Decline buttons */}
            {isAuthenticated ? (
                <div className="flex gap-4 justify-center mt-6">
                    <Button
                        onClick={onAcceptInvitation}
                        variant={"primary"}
                        disabled={
                            acceptMutation.isPending ||
                            declineMutation.isPending
                        }
                    >
                        {acceptMutation.isPending
                            ? "Accepting..."
                            : "Accept Invitation"}
                    </Button>

                    <Button
                        variant={"destructive"}
                        onClick={onDeclineInvitation}
                        disabled={
                            acceptMutation.isPending ||
                            declineMutation.isPending
                        }
                    >
                        {declineMutation.isPending
                            ? "Declining..."
                            : "Decline Invitation"}
                    </Button>
                </div>
            ) : (
                /* IF NOT AUTHENTICATED: prompt them to log in or sign up */
                <div className="flex flex-col gap-4 mt-6">
                    <p className="text-gray-600 mb-2">
                        You need to sign-in in order to join this project.
                    </p>
                    <Button
                        variant={"primary"}
                        onClick={() => handleAuthRedirect("login")}
                    >
                        Log in to Accept or Decline
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ProcessInvitation;
