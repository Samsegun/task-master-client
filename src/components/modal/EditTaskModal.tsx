import type { ProjectRole } from "@/lib/apiTypes";
import { editTaskForm } from "@/lib/formValidations";
import type { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import AssigneeSelect from "../common/AssigneeSelect";
import Button from "../common/Button";
import { Calendar } from "../ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
            assigneeId: task.assigneeId || undefined,
            priority: task.priority,
            dueDate: task.dueDate,
            status: task.status,
        },
    });

    function onSubmit(data: UpdateTaskFormData) {
        console.log(data);

        // updateTaskMutation.mutate(data, {
        //     onSuccess: () => {
        //         form.reset();
        //         closeDialog();
        //     },
        //     onError: (err: any) => {
        //         console.log(err);
        //     },
        // });
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <form id='update-task' onSubmit={form.handleSubmit(onSubmit)}>
                <DialogContent className='bg-brand-modal rounded-lg border border-nav-border'>
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
                            render={({ field }) => (
                                <>
                                    <FieldLabel htmlFor='date'>
                                        Due Date
                                    </FieldLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant='transparent'
                                                id='date'
                                                className={cn(
                                                    "justify-start bg-[#2d3f54] text-brand-primary -mt-4",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}>
                                                {field.value instanceof Date
                                                    ? format(field.value, "PPP")
                                                    : "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className='w-auto p-0'>
                                            <Calendar
                                                className=''
                                                mode='single'
                                                selected={
                                                    field.value instanceof Date
                                                        ? field.value
                                                        : undefined
                                                }
                                                captionLayout='dropdown'
                                                onSelect={field.onChange}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </>
                            )}
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
                        <DialogClose asChild>
                            <button
                                type='button'
                                // onClick={closeModal}
                                // disabled={createTaskMutation.isPending}
                                className='flex-1 bg-[#1a2332] hover:bg-[#0f1729] cursor-pointer
                                     disabled:opacity-50 text-brand-primary py-2 rounded-lg
                         transition-colors border border-brand-gray'>
                                Cancel
                            </button>
                        </DialogClose>

                        <Button
                            type='submit'
                            variant={"primary"}
                            form='update-task'
                            className='flex-1'>
                            Update Task
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default EditTaskModal;
