import { useUpdateMemberRole } from "@/hooks/useProjects";
import { useModalStore } from "@/store/useModalStore";
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

function EditMemberModal() {
    const updateMemberRoleMutation = useUpdateMemberRole();
    const { modalData, closeModal } = useModalStore();

    const { projectId, projectName, memberInfo, projectRole } = modalData;

    if (!projectId || !projectName || !memberInfo || !projectRole)
        return <div>Something went wrong :(</div>;

    function onDelete() {
        if (!projectId || !projectName || !memberInfo || !projectRole) return;

        updateMemberRoleMutation.mutate(
            {
                projectId,
                role: projectRole,
                userIdToUpdate: memberInfo.user.id,
            },
            {
                onSuccess: () => closeModal(),
            }
        );
    }

    return (
        <Dialog open={true} onOpenChange={closeModal}>
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
                    This action will make "
                    {memberInfo.user.username || memberInfo.user.firstName}" the
                    OWNER of this project and demote you to "MEMBER" ?
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
