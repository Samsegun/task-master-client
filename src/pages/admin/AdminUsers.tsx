import LoadingIcon from "@/components/common/LoadingIcon";
import PageTitle from "@/components/common/PageTitle";
import { TableCell, TableHead } from "@/components/table/TableUI";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllUsers } from "@/hooks/useAdminUsers";
import { useAuthStatus } from "@/hooks/useAuth";
import type { User } from "@/lib/apiTypes";
import { canAccessAdmin } from "@/lib/utils";
import { Link, Navigate } from "react-router";

function AdminUsers() {
    const { user: authUser } = useAuthStatus();
    const {
        users: superUsers,
        isLoading,
        isError,
        customErr,
    } = useGetAllUsers();

    if (isLoading) return <LoadingIcon />;

    if (isError) return <div>Something went wrong :( {customErr?.message}</div>;

    if (!canAccessAdmin(authUser?.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    const users = superUsers;

    return (
        <section className="space-y-5">
            <div className="flex items-center justify-between">
                <PageTitle>Admin · Users</PageTitle>
                <Badge variant="outline">Read-only tools</Badge>
            </div>

            <p className="text-sm text-gray-300">
                Current endpoints covered: list all users and view single-user
                details. Placeholder actions below are UI-only and ready for
                backend endpoints.
            </p>

            <div className="rounded-xl border border-nav-border p-3 md:p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                    {[
                        "Update role",
                        "Suspend account",
                        "Reset password",
                        "Force verify email",
                    ].map((action) => (
                        <button
                            key={action}
                            className="rounded-md border border-nav-border px-3 py-1.5 text-xs opacity-70 cursor-not-allowed"
                            disabled
                        >
                            {action} (coming soon)
                        </button>
                    ))}
                </div>

                {users && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Verified</TableHead>
                                <TableHead>{""}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((u: User["data"]) => (
                                <TableRow key={u.id}>
                                    <TableCell>
                                        {u.firstName || u.lastName
                                            ? `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim()
                                            : u.username}
                                    </TableCell>
                                    <TableCell>{u.email}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">
                                            {u.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {u.isVerified ? "Yes" : "No"}
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            className="underline text-brand-primary"
                                            to={`/admin/users/${u.id}`}
                                        >
                                            View
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </section>
    );
}

export default AdminUsers;
