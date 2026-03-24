import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

function DeleteModal({
    taskId,
    isOpen,
    onClose,
}: {
    taskId: string;
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Task</DialogTitle>
                    <DialogDescription>
                        Sure to delete task? {taskId}
                    </DialogDescription>
                </DialogHeader>

                <div>delete action buttons</div>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteModal;
