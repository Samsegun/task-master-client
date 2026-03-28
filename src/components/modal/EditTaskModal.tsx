import { useUpdateTask } from "@/hooks/useTasks";
import type { ProjectRole } from "@/lib/apiTypes";
import { editTaskForm } from "@/lib/formValidations";
import type { Task } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import AssigneeSelect from "../common/AssigneeSelect";
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

type EditTaskModalProps = {
    projectId: string;
    task: Task;
    isOpen: boolean;
    onClose: () => void;
    projectMembers: {
        role: ProjectRole;
        joinedAt: string;
        user: {
            id: string;
            firstName: string | null;
            lastName: string | null;
        };
    }[];
};

type UpdateTaskFormData = z.input<typeof editTaskForm>;

function EditTaskModal({
    projectId,
    task,
    isOpen,
    onClose,
    projectMembers,
}: EditTaskModalProps) {
    const form = useForm<UpdateTaskFormData>({
        resolver: zodResolver(editTaskForm),
        defaultValues: {
            title: task.title,
            description: task.description || "",
            assigneeId: task.assigneeId || null,
            priority: task.priority,
            dueDate: task.dueDate
                ? new Date(task.dueDate).toISOString().split("T")[0]
                : null,
            status: task.status,
        },
    });

    const updateTaskMutation = useUpdateTask();

    function onSubmit(data: UpdateTaskFormData) {
        const payLoad = {
            ...data,
            assigneeId: data.assigneeId !== "null" ? data.assigneeId : null,
            dueDate: data.dueDate || null,
        };

        updateTaskMutation.mutate(
            { projectId, taskId: task.id, payLoad },
            {
                onSuccess: () => closeModal(),
            }
        );
    }

    function closeModal() {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <form id='update-task' onSubmit={form.handleSubmit(onSubmit)}>
                <DialogContent
                    className='bg-brand-modal max-h-[500px] lg:max-h-[732px] overflow-y-auto
                 rounded-lg border border-nav-border'>
                    <DialogHeader className='border-b border-brand-primary/10'>
                        <DialogTitle className="text-xl font-bold text-brand-primary'">
                            Edit Task
                        </DialogTitle>

                        {/* accessible description referenced by DialogContent */}
                        <DialogDescription className='sr-only'>
                            Edit task details: change title, description,
                            priority, status and due date.
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

                        {/* status */}
                        <Controller
                            name='status'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldContent className='block'>
                                        <FieldLabel htmlFor='task-status'>
                                            Status
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
                                            id='task-status'
                                            aria-invalid={fieldState.invalid}>
                                            <SelectValue placeholder='Select' />
                                        </SelectTrigger>
                                        <SelectContent
                                            position='item-aligned'
                                            className='bg-[#263447]'>
                                            <SelectItem value='TODO'>
                                                Todo
                                            </SelectItem>
                                            <SelectItem value='IN_PROGRESS'>
                                                In Progress
                                            </SelectItem>
                                            <SelectItem value='DONE'>
                                                Done
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
                            render={({ field }) => {
                                return (
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
                                            className='w-full bg-[#1a2332] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        />
                                    </>
                                );
                            }}
                        />

                        {/* assignee */}
                        <Controller
                            name='assigneeId'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <AssigneeSelect
                                    projectId={projectId}
                                    members={projectMembers}
                                    field={field}
                                    fieldState={fieldState}
                                />
                            )}
                        />
                    </FieldGroup>

                    <DialogFooter className='flex gap-3'>
                        <DialogClose
                            asChild
                            disabled={updateTaskMutation.isPending}>
                            <button
                                type='button'
                                className='flex-1 bg-[#1a2332] hover:bg-[#0f1729] cursor-pointer
                                     disabled:opacity-50 text-brand-primary py-2 rounded-lg
                         transition-colors border border-brand-gray'>
                                Cancel
                            </button>
                        </DialogClose>

                        <Button
                            type='submit'
                            disabled={updateTaskMutation.isPending}
                            variant={"primary"}
                            form='update-task'
                            className='flex-1'>
                            {updateTaskMutation.isPending
                                ? "Updating Task..."
                                : "Update Task"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default EditTaskModal;
