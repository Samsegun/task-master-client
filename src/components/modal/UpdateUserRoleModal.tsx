import { useUpdateUserRole } from "@/hooks/useAdminUsers";
import { updateUserRoleForm, UserRoleSchema } from "@/lib/formValidations";
import { useModalStore } from "@/store/useModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
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
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "../ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

type UpdateUserRoleFormData = z.input<typeof updateUserRoleForm>;

function UpdateUserRoleModal() {
    const { modalData, closeModal } = useModalStore();
    const updateUserMutation = useUpdateUserRole();

    const form = useForm<UpdateUserRoleFormData>({
        resolver: zodResolver(updateUserRoleForm),
        defaultValues: {
            role: "USER",
        },
    });

    const userRoles = UserRoleSchema.options.filter(
        (role) => role != modalData?.currentUserRole,
    );

    function onSubmit(data: UpdateUserRoleFormData) {
        if (!modalData.userId || !data.role) return;

        updateUserMutation.mutate(
            { userId: modalData.userId, role: data.role },
            {
                onSuccess: () => {
                    form.reset();
                    closeModal();
                },
            },
        );
    }

    return (
        <Dialog open={true} onOpenChange={closeModal}>
            {/* form */}
            <form id="update-user-role" onSubmit={form.handleSubmit(onSubmit)}>
                <FormContentWrapper>
                    <DialogHeader className="border-b border-brand-primary/10">
                        <DialogTitle className="text-xl font-bold text-brand-primary'">
                            Update User Role
                        </DialogTitle>

                        <DialogDescription className="sr-only">
                            Give a new role to the user. This will change the
                            permissions of the user in the system, so choose
                            carefully.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mb-1 bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                        <p className="text-orange-400 text-sm flex gap-2 items-center">
                            <CircleAlert />{" "}
                            <span className="font-bold">
                                Give a new role to the user. This will change
                                the permissions of the user in the system, so
                                choose carefully.
                            </span>
                        </p>
                    </div>

                    <FieldGroup>
                        {/* role */}
                        <Controller
                            name="role"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <>
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldContent className="block">
                                            <FieldLabel htmlFor="user-role">
                                                Role
                                            </FieldLabel>
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </FieldContent>

                                        <Select
                                            name={field.name}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger
                                                id="user-role"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            >
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>

                                            <SelectContent
                                                position="item-aligned"
                                                className="bg-[#263447]"
                                            >
                                                {userRoles.map((role) => (
                                                    <SelectItem
                                                        key={role}
                                                        value={role}
                                                    >
                                                        {role}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </>
                            )}
                        />
                    </FieldGroup>

                    <DialogFooter className="flex gap-3">
                        <DialogClose asChild>
                            <button
                                type="button"
                                onClick={() => form.reset()}
                                disabled={updateUserMutation.isPending}
                                className="flex-1 bg-[#1a2332] hover:bg-[#0f1729] text-brand-primary py-2 rounded-lg
                                             transition-colors border border-brand-gray cursor-pointer"
                            >
                                Cancel
                            </button>
                        </DialogClose>

                        <Button
                            type="submit"
                            variant={"primary"}
                            form="update-user-role"
                            disabled={updateUserMutation.isPending}
                            className="flex-1"
                        >
                            {updateUserMutation.isPending
                                ? "Updating user..."
                                : "Update User Role"}
                        </Button>
                    </DialogFooter>
                </FormContentWrapper>
            </form>
        </Dialog>
    );
}

export default UpdateUserRoleModal;
