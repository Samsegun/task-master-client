import { useUpdateUserSuspension } from "@/hooks/useAdminUsers";
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

function SuspendUserModal() {
    const { modalData, closeModal } = useModalStore();
    const suspendUserMutation = useUpdateUserSuspension();

    function onSuspend() {
        if (!modalData.userId || modalData.isSuspended === undefined || null)
            return;

        suspendUserMutation.mutate(
            { userId: modalData.userId, isSuspended: !modalData.isSuspended },
            {
                onSuccess: () => {
                    closeModal();
                },
            },
        );
    }

    return (
        <Dialog open={true} onOpenChange={closeModal}>
            <DialogContent className="bg-brand-modal rounded-lg border border-nav-border space-y-4">
                <DialogHeader className="border-b border-brand-primary/10">
                    <DialogTitle className="text-xl font-bold text-brand-primary'">
                        {modalData?.isSuspended
                            ? "Reactivate User"
                            : "Suspend User"}
                    </DialogTitle>

                    <DialogDescription className="sr-only">
                        Suspend or reactivate {modalData?.username}
                    </DialogDescription>
                </DialogHeader>

                <p className="font-semibold ml-4 italic text-center tracking-wide">
                    This action will{" "}
                    {modalData?.isSuspended ? "Reactivate" : "Suspend"}{" "}
                    {modalData?.username}?
                </p>

                <DialogFooter className="flex gap-3">
                    <DialogClose asChild>
                        <button
                            type="button"
                            disabled={suspendUserMutation.isPending}
                            className="flex-1 bg-[#1a2332] hover:bg-[#0f1729] cursor-pointer
                                                     disabled:opacity-50 text-brand-primary py-2 rounded-lg
                                         transition-colors border border-brand-gray"
                        >
                            Cancel
                        </button>
                    </DialogClose>

                    <Button
                        type="submit"
                        disabled={suspendUserMutation.isPending}
                        onClick={onSuspend}
                        variant={
                            modalData?.isSuspended ? "primary" : "destructive"
                        }
                        className="flex-1"
                    >
                        {suspendUserMutation.isPending
                            ? `${modalData?.isSuspended ? "Reactivating..." : "Suspending..."} ${modalData?.username}`
                            : `${modalData?.isSuspended ? "Reactivate" : "Suspend"} ${modalData?.username}`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default SuspendUserModal;
