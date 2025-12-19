import type { Member } from "@/lib/types";
import { MoreVertical, Plus } from "lucide-react";
import { Menu } from "../Menu/Menu";
import AddMemberModal from "../modal/AddMemberModal";
import { Table, TableBody, TableHeader, TableRow } from "../ui/table";
import { TableCell, TableHead } from "./TableUI";

const membersTableHeaders = ["name", "email", "role", ""];

function MembersTabTable({ members }: { members: Member[] }) {
    return (
        <section>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>Team Members</h2>

                <Menu initialOpen={false}>
                    <Menu.Trigger
                        variant={"primary"}
                        className='flex items-center gap-2'>
                        <Plus size={30} />
                        Add Member
                    </Menu.Trigger>

                    <Menu.Content direction='center'>
                        <AddMemberModal projectId='23' />
                    </Menu.Content>
                </Menu>
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
                        {members.map(member => (
                            <TableRow
                                key={member.id}
                                className='border-b border-brand-primary/10 hover:bg-[#2d3f54]'>
                                <TableCell className='p-4'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-10 rounded-full bg-brand-button flex items-center justify-center'>
                                            {member.name.charAt(0)}
                                        </div>
                                        <span className='font-medium'>
                                            {member.name}
                                        </span>
                                    </div>
                                </TableCell>

                                <TableCell className='p-4 text-gray-300'>
                                    {member.email}
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
                                    <button className='p-1 hover:bg-[#1a2332] rounded transition-colors cursor-pointer'>
                                        <MoreVertical
                                            size={20}
                                            className='text-gray-400'
                                        />
                                    </button>
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
