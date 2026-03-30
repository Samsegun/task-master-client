import { useRemoveProjectMember } from "@/hooks/useProjects";
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

type DeleteMemberProps = {
    projectId: string;
    deleteMemberInfo: { userToBeRemoved: MemberShape; projectName: string };
    isOpen: boolean;
    onClose: () => void;
};

function DeleteMemberModal({
    projectId,
    deleteMemberInfo,
    isOpen,
    onClose,
}: DeleteMemberProps) {
    const deleteMemberMutation = useRemoveProjectMember();
    const {
        projectName,
        userToBeRemoved: { user },
    } = deleteMemberInfo;

    function onDelete() {
        deleteMemberMutation.mutate(
            { projectId, userIdToRemove: user.id },
            {
                onSuccess: () => onClose(),
            }
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='bg-brand-modal rounded-lg border border-nav-border space-y-4'>
                <DialogHeader className='border-b border-brand-primary/10'>
                    <DialogTitle className="text-xl font-bold text-brand-primary'">
                        Remove Member
                    </DialogTitle>

                    <DialogDescription className='sr-only'>
                        Remove member from this project
                    </DialogDescription>
                </DialogHeader>

                <p className='font-semibold ml-4 italic text-center tracking-wide'>
                    This action will permanently remove "{user.firstName}" from
                    "{projectName}" ?
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
                        // form='update-task'
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
