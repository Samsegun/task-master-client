import { useRemoveProjectMember } from "@/hooks/useProjects";
import { useModalStore } from "@/store/useModalStore";
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

function DeleteMemberModal() {
    const { modalData, closeModal } = useModalStore();
    const deleteMemberMutation = useRemoveProjectMember();

    const { projectId, projectName, memberInfo } = modalData;

    if (!projectId || !projectName || !memberInfo)
        return <div>Something went wrong :(</div>;

    function onDelete() {
        if (!projectId || !projectName || !memberInfo) return;

        deleteMemberMutation.mutate(
            { projectId, userIdToRemove: memberInfo.user.id },
            {
                onSuccess: () => closeModal(),
            }
        );
    }

    return (
        <Dialog open={true} onOpenChange={closeModal}>
            <DialogContent className='bg-brand-modal rounded-lg border border-nav-border space-y-4'>
                <DialogHeader className='border-b border-brand-primary/10'>
                    <DialogTitle className="text-xl font-bold text-brand-primary'">
                        Remove Member
                    </DialogTitle>

                    <DialogDescription className='sr-only'>
                        Remove member from this project
                    </DialogDescription>
                </DialogHeader>

                <p className='font-semibold italic text-center'>
                    This action will remove "
                    {memberInfo.user.username || memberInfo.user.firstName}"
                    from "{projectName}" ?
                </p>

                <DialogFooter className='flex gap-3'>
                    <DialogClose asChild>
                        <button
                            type='button'
                            disabled={deleteMemberMutation.isPending}
                            className='flex-1 bg-[#1a2332] hover:bg-[#0f1729] cursor-pointer
                                                     disabled:opacity-50 text-brand-primary py-2 rounded-lg
                                         transition-colors border border-brand-gray'>
                            Cancel
                        </button>
                    </DialogClose>

                    <Button
                        type='submit'
                        disabled={deleteMemberMutation.isPending}
                        onClick={onDelete}
                        variant={"destructive"}
                        className='flex-1'>
                        {deleteMemberMutation.isPending
                            ? "Removing Member..."
                            : "Remove Member"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteMemberModal;
