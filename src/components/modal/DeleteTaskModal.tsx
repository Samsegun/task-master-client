import { useDeleteTask } from "@/hooks/useTasks";
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

function DeleteTaskModal() {
    const deleteTaskMutation = useDeleteTask();
    const { closeModal, modalData } = useModalStore();

    function onDelete() {
        if (!modalData?.projectId || !modalData?.task?.id) return;

        deleteTaskMutation.mutate(
            { projectId: modalData.projectId, taskId: modalData.task.id },
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
                        Delete Task
                    </DialogTitle>

                    <DialogDescription className='sr-only'>
                        Delete specific task from this project
                    </DialogDescription>
                </DialogHeader>

                <p className='font-semibold ml-4 italic text-center tracking-wide'>
                    This action will delete "{modalData?.task?.title}" from
                    tasks?
                </p>

                <DialogFooter className='flex gap-3'>
                    <DialogClose asChild>
                        <button
                            type='button'
                            disabled={deleteTaskMutation.isPending}
                            className='flex-1 bg-[#1a2332] hover:bg-[#0f1729] cursor-pointer
                                                     disabled:opacity-50 text-brand-primary py-2 rounded-lg
                                         transition-colors border border-brand-gray'>
                            Cancel
                        </button>
                    </DialogClose>

                    <Button
                        type='submit'
                        disabled={deleteTaskMutation.isPending}
                        onClick={onDelete}
                        variant={"destructive"}
                        className='flex-1'>
                        {deleteTaskMutation.isPending
                            ? "Deleting Task..."
                            : "Delete Task"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteTaskModal;
