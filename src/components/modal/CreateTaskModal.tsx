import { useCreateTask } from "@/hooks/useTasks";
import { createTaskForm } from "@/lib/formValidations";
import { useModalStore } from "@/store/useModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import AssigneeSelect from "../common/AssigneeSelect";
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
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

type CreateTaskFormData = z.input<typeof createTaskForm>;

function CreateTaskModal() {
    const createTaskMutation = useCreateTask();
    const { modalData, closeModal } = useModalStore();

    const form = useForm<CreateTaskFormData>({
        resolver: zodResolver(createTaskForm),
        defaultValues: {
            title: "",
            description: "",
            assigneeId: null,
            priority: "MEDIUM",
            dueDate: null,
        },
    });

    function onSubmit(formData: CreateTaskFormData) {
        if (!modalData?.projectId) return;

        const payLoad = {
            ...formData,
            assigneeId:
                formData.assigneeId !== "null" ? formData.assigneeId : null,
        };

        createTaskMutation.mutate(
            { payLoad, projectId: modalData.projectId },
            {
                onSuccess: () => {
                    form.reset();
                    closeModal();
                },
            }
        );
    }

    return (
        <Dialog open={true} onOpenChange={closeModal}>
            <form
                id='create-task'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6 p-6'>
                <FormContentWrapper>
                    <DialogHeader className='border-b border-brand-primary/10'>
                        <DialogTitle className="text-xl font-bold text-brand-primary'">
                            Create New Task
                        </DialogTitle>

                        {/* accessible description referenced by DialogContent */}
                        <DialogDescription className='sr-only'>
                            Creak task for members on this project
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup>
                        {/* title */}
                        <Controller
                            name='title'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='task-title'>
                                        Task Title{" "}
                                        <span className='text-red-500'>*</span>
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id='task-title'
                                        aria-invalid={fieldState.invalid}
                                        placeholder='Enter task title'
                                        autoComplete='off'
                                        className='px-4 py-2'
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        {/* description */}
                        <Controller
                            name='description'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='task-description'>
                                        Description
                                    </FieldLabel>
                                    <textarea
                                        {...field}
                                        id='task-description'
                                        aria-invalid={fieldState.invalid}
                                        placeholder='Enter task description (optional)'
                                        rows={3}
                                        className='bg-brand-card border border-brand-primary rounded-lg px-4 py-2 resize-none'
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        {/* priority */}
                        <Controller
                            name='priority'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldContent className='block'>
                                        <FieldLabel htmlFor='task-priority'>
                                            Priority
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
                                        onValueChange={field.onChange}>
                                        <SelectTrigger
                                            id='task-priority'
                                            aria-invalid={fieldState.invalid}>
                                            <SelectValue placeholder='Select' />
                                        </SelectTrigger>

                                        <SelectContent
                                            position='item-aligned'
                                            className='bg-[#263447]'>
                                            <SelectItem value='LOW'>
                                                Low
                                            </SelectItem>
                                            <SelectItem value='MEDIUM'>
                                                Medium
                                            </SelectItem>
                                            <SelectItem value='HIGH'>
                                                High
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}
                        />

                        {/* due date */}
                        <Controller
                            name='dueDate'
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FieldLabel htmlFor='dueDate'>
                                        Due Date
                                    </FieldLabel>

                                    <input
                                        type='date'
                                        id='dueDate'
                                        value={
                                            field.value
                                                ? String(field.value).split(
                                                      "T"
                                                  )[0]
                                                : ""
                                        }
                                        onChange={e => {
                                            const dateValue = e.target.value
                                                ? new Date(
                                                      e.target.value
                                                  ).toISOString()
                                                : null;
                                            field.onChange(dateValue);
                                        }}
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split("T")[0]
                                        }
                                        className='w-full bg-[#1a2332] border border-gray-600 rounded-lg px-4 py-2
                                             text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    />
                                </>
                            )}
                        />

                        {/* assignee */}
                        <Controller
                            name='assigneeId'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <AssigneeSelect
                                    // members={projectMembers}
                                    members={modalData?.projectMembers!}
                                    field={field}
                                    fieldState={fieldState}
                                />
                            )}
                        />
                    </FieldGroup>

                    <DialogFooter className='flex gap-3'>
                        <DialogClose asChild>
                            <button
                                type='button'
                                onClick={() => form.reset()}
                                disabled={createTaskMutation.isPending}
                                className='flex-1 bg-[#1a2332] hover:bg-[#0f1729] cursor-pointer
                                                      disabled:opacity-50 text-brand-primary py-2 rounded-lg
                                          transition-colors border border-brand-gray'>
                                Cancel
                            </button>
                        </DialogClose>

                        <Button
                            type='submit'
                            variant={"primary"}
                            form='create-task'
                            disabled={createTaskMutation.isPending}
                            className='flex-1'>
                            {createTaskMutation.isPending
                                ? "Creating Task..."
                                : "Create Task"}
                        </Button>
                    </DialogFooter>
                </FormContentWrapper>
            </form>
        </Dialog>
    );
}

export default CreateTaskModal;
