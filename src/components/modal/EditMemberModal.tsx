import { useUpdateMemberRole } from "@/hooks/useProjects";
import type { ProjectRole } from "@/lib/apiTypes";
import type { MemberShape } from "@/lib/types";
import Button from "../common/Button";
import FormContentWrapper from "../common/FormContentWrapper";
import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

type EditMemberProps = {
    editMemberInfo: {
        userToBeEdited: MemberShape;
        project: { name: string; id: string };
    };
    memberRoleToEdit: ProjectRole;
    isOpen: boolean;
    onClose: () => void;
};

function EditMemberModal({
    isOpen,
    onClose,
    editMemberInfo,
    memberRoleToEdit,
}: EditMemberProps) {
    const updateMemberRoleMutation = useUpdateMemberRole();

    const {
        userToBeEdited: { user },
        project: { id },
    } = editMemberInfo;

    function onDelete() {
        updateMemberRoleMutation.mutate(
            { projectId: id, role: memberRoleToEdit, userIdToUpdate: user.id },
            {
                onSuccess: () => onClose(),
            }
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <FormContentWrapper>
                <DialogHeader className='border-b border-brand-primary/10'>
                    <DialogTitle className="text-xl font-bold text-brand-primary'">
                        Edit Member Role
                    </DialogTitle>

                    <DialogDescription className='sr-only'>
                        Edit member role on a project
                    </DialogDescription>
                </DialogHeader>

                <p className='font-semibold italic text-center'>
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
            </FormContentWrapper>
        </Dialog>
    );
}

export default EditMemberModal;
