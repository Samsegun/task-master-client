import Button from "@/components/common/Button";
import LoadingIcon from "@/components/common/LoadingIcon";
import PageTitle from "@/components/common/PageTitle";
import { useGetUser } from "@/hooks/useAdminUsers";
import { useAuthStatus } from "@/hooks/useAuth";
import { canAccessAdmin, formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router";

function AdminUserDetails() {
    const { user: authUser } = useAuthStatus();
    const { userId = "" } = useParams();
    const navigate = useNavigate();

    const { user, isLoading, isError, customErr } = useGetUser(userId);

    if (isLoading) return <LoadingIcon />;

    if (isError) return <div>Something went wrong :( {customErr?.message}</div>;

    if (!canAccessAdmin(authUser?.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    // const user = superUser;

    return (
        <section className="space-y-5">
            <PageTitle>Admin · User Details</PageTitle>

            <Button
                type="button"
                variant={"primary"}
                onClick={() => navigate("/admin/users")}
                className="flex items-center gap-2 hover:text-white/80 mb-4 transition-colors"
            >
                <ArrowLeft size={20} />
                Back to Users
            </Button>

            {user && (
                <div className="mt-4 bg-brand-sidebar rounded-xl border border-nav-border p-4 space-y-3">
                    <p>
                        <strong>ID:</strong> {user.id}
                    </p>
                    <p>
                        <strong>Username:</strong> {user.username}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Name:</strong> {user.firstName ?? "-"}{" "}
                        {user.lastName ?? ""}
                    </p>
                    <p>
                        <strong>Account Creation Date:</strong>{" "}
                        {formatDate(user.createdAt)}
                    </p>
                    <p>
                        <strong>Last Updated:</strong>{" "}
                        {formatDate(user.updatedAt)}
                    </p>
                    <p>
                        <strong>Role:</strong> {user.role}
                    </p>
                    <p>
                        <strong>Verified:</strong>{" "}
                        {user.isVerified ? "Yes" : "No"}
                    </p>

                    {/* <div className="pt-3 border-t border-nav-border">
                        <p className="text-sm text-gray-300">
                            Additional placeholders for future backend support:
                            audit logs, active sessions, projects owned, and
                            permission overrides.
                        </p>
                    </div> */}
                </div>
            )}
        </section>
    );
}

export default AdminUserDetails;
