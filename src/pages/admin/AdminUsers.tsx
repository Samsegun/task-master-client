import LoadingIcon from "@/components/common/LoadingIcon";
import PageTitle from "@/components/common/PageTitle";
import { TableCell, TableHead } from "@/components/table/TableUI";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllUsers } from "@/hooks/useAdminUsers";
import { useAuthStatus } from "@/hooks/useAuth";
import type { User } from "@/lib/apiTypes";
import { canAccessAdmin, nonUserRoles } from "@/lib/utils";
import { Link, Navigate } from "react-router";

const UsersTableHeaders = ["Name", "Email", "Role", "Verified", ""];

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
                <Badge variant="secondary">Read-only tools</Badge>
            </div>

            <p className="text-sm text-gray-300">
                Current endpoints covered: list all users and view single-user
                details. Placeholder actions below are UI-only and ready for
                backend endpoints.
            </p>

            <div className="mt-6 md:mt-4 rounded-xl rounded-t-none lg:rounded-t-xl bg-brand-card">
                {/* <div className="flex flex-wrap gap-2 mb-4">
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
                </div> */}

                {users && (
                    <Table>
                        <TableHeader>
                            <TableRow
                                className="bg-brand-table-header border-b 
         border-brand-primary/10 hover:bg-brand-table-header"
                            >
                                {UsersTableHeaders.map((header) => (
                                    <TableHead
                                        key={header}
                                        className="lg:first:rounded-tl-xl lg:last:rounded-tr-xl"
                                    >
                                        {header}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {users.map((u: User["data"]) => (
                                <TableRow
                                    key={u.id}
                                    className="border-b border-brand-primary/10 hover:bg-[#2d3f54]"
                                >
                                    <TableCell className="capitalize">
                                        {u.firstName || u.lastName
                                            ? `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim()
                                            : u.username}
                                    </TableCell>

                                    <TableCell>{u.email}</TableCell>

                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={
                                                nonUserRoles.includes(u.role)
                                                    ? "bg-brand-button text-white"
                                                    : ""
                                            }
                                        >
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
