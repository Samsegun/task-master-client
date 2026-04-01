import { useUpdateMemberRole } from "@/hooks/useProjects";
import type { ProjectRole } from "@/lib/apiTypes";
import type { MemberShape } from "@/lib/types";
import Button from "../common/Button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

type EditMemberProps = {
    editMemberInfo: { userToBeEdited: MemberShape; projectName: string };
    memberRoleToEdit: ProjectRole;
    projectId: string;
    isOpen: boolean;
    onClose: () => void;
};

function EditMemberModal({
    isOpen,
    onClose,
    editMemberInfo,
    projectId,
    memberRoleToEdit,
}: EditMemberProps) {
    const updateMemberRoleMutation = useUpdateMemberRole();

    const {
        userToBeEdited: { user },
    } = editMemberInfo;

    function onDelete() {
        updateMemberRoleMutation.mutate(
            { projectId, role: memberRoleToEdit, userIdToUpdate: user.id },
            {
                onSuccess: () => onClose(),
            }
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className='bg-brand-modal max-h-[500px] lg:max-h-[732px] overflow-y-auto
                        rounded-lg border border-nav-border'>
                <DialogHeader className='border-b border-brand-primary/10'>
                    <DialogTitle className="text-xl font-bold text-brand-primary'">
                        Edit Member Role
                    </DialogTitle>

                    <DialogDescription className='sr-only'>
                        Edit member role on a project
                    </DialogDescription>
                </DialogHeader>

                <p className='font-semibold ml-4 italic text-center tracking-wide'>
                    This action will make "{user.firstName}" the OWNER of this
                    project and demote you to "MEMBER" ?
                </p>

                <DialogFooter className='flex gap-3'>
                    <DialogClose asChild>
                        <button
                            type='button'
                            disabled={updateMemberRoleMutation.isPending}
                            className='flex-1 bg-[#1a2332] hover:bg-[#0f1729] cursor-pointer
                                                                     disabled:opacity-50 text-brand-primary py-2 rounded-lg
                                                         transition-colors border border-brand-gray'>
                            Cancel
                        </button>
                    </DialogClose>

                    <Button
                        type='submit'
                        disabled={updateMemberRoleMutation.isPending}
                        onClick={onDelete}
                        variant={"destructive"}
                        className='flex-1'>
                        {updateMemberRoleMutation.isPending
                            ? "Editing Member..."
                            : "Edit Member"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditMemberModal;
