import { useLeaveProject } from "@/hooks/useProjects";
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

type LeaveModalProps = {
    project: { projectId: string; projectName: string };
    isOpen: boolean;
    onClose: () => void;
};

function LeaveProjectModal({ project, isOpen, onClose }: LeaveModalProps) {
    const leaveProjectMutation = useLeaveProject();

    function onDelete() {
        leaveProjectMutation.mutate(
            { projectId: project.projectId },
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
                        Leave Project
                    </DialogTitle>

                    <DialogDescription className='sr-only'>
                        Exit this project
                    </DialogDescription>
                </DialogHeader>

                <p className='font-semibold ml-4 italic text-center tracking-wide'>
                    This action will exit you from "{project.projectName}"?
                </p>

                <DialogFooter className='flex gap-3'>
                    <DialogClose asChild>
                        <button
                            type='button'
                            disabled={leaveProjectMutation.isPending}
                            className='flex-1 bg-[#1a2332] hover:bg-[#0f1729] cursor-pointer
                                                     disabled:opacity-50 text-brand-primary py-2 rounded-lg
                                         transition-colors border border-brand-gray'>
                            Cancel
                        </button>
                    </DialogClose>

                    <Button
                        type='submit'
                        disabled={leaveProjectMutation.isPending}
                        onClick={onDelete}
                        variant={"destructive"}
                        className='flex-1'>
                        {leaveProjectMutation.isPending
                            ? "Leaving Project..."
                            : "Leave Project"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default LeaveProjectModal;
