import { useDeleteProject } from "@/hooks/useProjects";
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

function DeleteProjectModal() {
    const deleteProjectMutation = useDeleteProject();
    const { modalData, closeModal } = useModalStore();

    function onDelete() {
        if (!modalData?.projectId) return;

        deleteProjectMutation.mutate(
            { projectId: modalData.projectId },
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
                        Delete Project
                    </DialogTitle>

                    <DialogDescription className='sr-only'>
                        Delete project permanently
                    </DialogDescription>
                </DialogHeader>

                <p className='font-semibold ml-4 italic text-center tracking-wide'>
                    This action will delete "{modalData?.projectName}" from
                    projects?
                </p>

                <DialogFooter className='flex gap-3'>
                    <DialogClose asChild>
                        <button
                            type='button'
                            disabled={deleteProjectMutation.isPending}
                            className='flex-1 bg-[#1a2332] hover:bg-[#0f1729] cursor-pointer
                                                     disabled:opacity-50 text-brand-primary py-2 rounded-lg
                                         transition-colors border border-brand-gray'>
                            Cancel
                        </button>
                    </DialogClose>

                    <Button
                        type='submit'
                        disabled={deleteProjectMutation.isPending}
                        onClick={onDelete}
                        variant={"destructive"}
                        className='flex-1'>
                        {deleteProjectMutation.isPending
                            ? "Deleting Project..."
                            : "Delete Project"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteProjectModal;
