import type { Project, ProjectRole } from "@/lib/apiTypes";
import { formatDate } from "@/lib/utils";
import { useGlobalModals } from "@/providers/GlobalModalsProvider";
import { MoreVertical, Plus } from "lucide-react";
import { useMemo } from "react";
import Button from "../common/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Table, TableBody, TableHeader, TableRow } from "../ui/table";
import { TableCell, TableHead } from "./TableUI";

type MembersTabTableProps = {
    project: Project["project"];
    projectRole: ProjectRole;
};

const membersTableHeaders = ["name", "joined", "role", ""];

function MembersTabTable({ project, projectRole }: MembersTabTableProps) {
    const { openAddMember, handleProjectMember } = useGlobalModals();

    const sortedMembersByOwner = useMemo(
        () =>
            [...project.members].sort((a, b) => {
                if (a.role === "OWNER" && b.role !== "OWNER") return -1;
                if (a.role !== "OWNER" && b.role === "OWNER") return 1;
                return 0;
            }),

        [project.members]
    );

    return (
        <section>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>Team Members</h2>

                {projectRole === "OWNER" && (
                    <Button
                        variant={"primary"}
                        className={`flex items-center gap-2`}
                        onClick={() => openAddMember(project.id)}>
                        <Plus size={30} />

                        <span>Add Member</span>
                    </Button>
                )}
            </div>

            {/* members table */}
            <div
                className='mt-6 md:mt-4 rounded-xl rounded-t-none lg:rounded-t-xl bg-brand-card
                 border border-brand-primary/10'>
                <Table>
                    <TableHeader>
                        <TableRow
                            className='bg-brand-table-header border-b 
         border-brand-primary/10 hover:bg-brand-table-header'>
                            {membersTableHeaders.map(header => (
                                <TableHead
                                    key={header}
                                    className='lg:first:rounded-tl-xl lg:last:rounded-tr-xl'>
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {sortedMembersByOwner.map(member => (
                            <TableRow
                                key={member.user.id}
                                className='border-b border-brand-primary/10 hover:bg-[#2d3f54]'>
                                <TableCell className='p-4'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-10 rounded-full bg-brand-button flex items-center justify-center'>
                                            {(
                                                member.user.username?.charAt(
                                                    0
                                                ) ??
                                                member.user?.firstName?.charAt(
                                                    0
                                                ) ??
                                                "?"
                                            ).toUpperCase()}
                                        </div>
                                        <span className='font-medium capitalize'>
                                            {member.user?.username ??
                                                member.user?.firstName ??
                                                "Unknown"}
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell className='p-4 text-gray-300'>
                                    {formatDate(member.joinedAt)}
                                </TableCell>

                                <TableCell className='p-4'>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            member.role === "OWNER"
                                                ? "bg-purple-500/10 text-purple-500"
                                                : "bg-gray-500/10 text-gray-400"
                                        }`}>
                                        {member.role}
                                    </span>
                                </TableCell>

                                <TableCell className='p-4'>
                                    {projectRole === "OWNER" &&
                                        member.role !== "OWNER" && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger
                                                    className='p-1 hover:bg-brand-gray/50 rounded
                                                 transition-colors cursor-pointer'>
                                                    <MoreVertical
                                                        size={20}
                                                        className='text-brand-gray'
                                                    />
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent className='bg-brand-sidebar border-nav-border text-brand-primary'>
                                                    {member.role ===
                                                        "MEMBER" && (
                                                        <DropdownMenuItem
                                                            className='cursor-pointer'
                                                            onClick={() =>
                                                                handleProjectMember(
                                                                    {
                                                                        userToBeEdited:
                                                                            member,
                                                                        project:
                                                                            {
                                                                                id: project.id,
                                                                                name: project.name,
                                                                            },
                                                                        action: "EDIT",
                                                                        memberRoleToEdit:
                                                                            "OWNER",
                                                                    }
                                                                )
                                                            }>
                                                            <span>
                                                                Promote to Owner
                                                            </span>
                                                        </DropdownMenuItem>
                                                    )}

                                                    {member.role ===
                                                        "MEMBER" && (
                                                        <DropdownMenuItem
                                                            className='cursor-pointer text-red-500
                                                 hover:text-red-700'
                                                            onClick={() => {
                                                                handleProjectMember(
                                                                    {
                                                                        userToBeEdited:
                                                                            member,
                                                                        project:
                                                                            {
                                                                                id: project.id,
                                                                                name: project.name,
                                                                            },
                                                                        action: "REMOVE",
                                                                    }
                                                                );
                                                            }}>
                                                            <span>
                                                                Remove Member
                                                            </span>
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
}

export default MembersTabTable;
