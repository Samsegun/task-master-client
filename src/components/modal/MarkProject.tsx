import { useUpdateProject } from "@/hooks/useProjects";
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

function MarkProject() {
    const updateProjectMutation = useUpdateProject();
    const { modalData, closeModal } = useModalStore();

    const { projectStatus, projectId, projectName } = modalData;

    function onMarkProject() {
        updateProjectMutation.mutate(
            {
                projectId: projectId!,
                payLoad: { status: projectStatus },
            },
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
                        Mark Project
                    </DialogTitle>

                    <DialogDescription className='sr-only'>
                        Mark project as {projectStatus}
                    </DialogDescription>
                </DialogHeader>

                <p className='font-semibold ml-4 italic text-center tracking-wide'>
                    This action will mark "{projectName}" as {projectStatus}?
                </p>

                <DialogFooter className='flex gap-3'>
                    <DialogClose asChild>
                        <button
                            type='button'
                            disabled={updateProjectMutation.isPending}
                            className='flex-1 bg-[#1a2332] hover:bg-[#0f1729] cursor-pointer
                                                     disabled:opacity-50 text-brand-primary py-2 rounded-lg
                                         transition-colors border border-brand-gray'>
                            Cancel
                        </button>
                    </DialogClose>

                    <Button
                        type='submit'
                        disabled={updateProjectMutation.isPending}
                        onClick={onMarkProject}
                        variant={"warning"}
                        className='flex-1'>
                        {updateProjectMutation.isPending
                            ? `Marking as ${projectStatus}...`
                            : `Mark as ${projectStatus}`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default MarkProject;
