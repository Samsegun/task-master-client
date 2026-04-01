import { useDeleteTask } from "@/hooks/useTasks";
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

type DeleteModalProps = {
    task: { id: string; title: string };
    projectId: string;
    isOpen: boolean;
    onClose: () => void;
};

function DeleteTaskModal({
    task,
    projectId,
    isOpen,
    onClose,
}: DeleteModalProps) {
    const deleteTaskMutation = useDeleteTask();

    function onDelete() {
        deleteTaskMutation.mutate(
            { projectId, taskId: task.id },
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
                        Delete Task
                    </DialogTitle>

                    <DialogDescription className='sr-only'>
                        Delete specific task from this project
                    </DialogDescription>
                </DialogHeader>

                <p className='font-semibold ml-4 italic text-center tracking-wide'>
                    This action will delete "{task.title}" from tasks?
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
                        // form='update-task'
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
