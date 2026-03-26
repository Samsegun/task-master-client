import { useCreateTask } from "@/hooks/useTasks";
import type { ProjectRole } from "@/lib/apiTypes";
import { createTaskForm } from "@/lib/formValidations";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useDialog } from "../Dialog/DialogContext";
import AssigneeSelect from "../common/AssigneeSelect";
import Button from "../common/Button";
import { Calendar } from "../ui/calendar";
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

type CreateTaskModalProps = {
    projectId: string | undefined;
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

type CreateTaskFormData = z.input<typeof createTaskForm>;

function CreateTaskModal({ projectId, projectMembers }: CreateTaskModalProps) {
    const createTaskMutation = useCreateTask(projectId);
    const { closeDialog } = useDialog();

    const form = useForm<CreateTaskFormData>({
        resolver: zodResolver(createTaskForm),
        defaultValues: {
            title: "",
            description: "",
            assigneeId: "",
            priority: "MEDIUM",
        },
    });

    function closeModal() {
        form.reset();
        closeDialog();
    }

    function onSubmit(data: CreateTaskFormData) {
        createTaskMutation.mutate(data, {
            onSuccess: () => {
                form.reset();
                closeDialog();
            },
        });
    }

    return (
        <div className='rounded-lg border border-nav-border'>
            {/* header */}
            <div className='flex justify-between items-center p-4 border-b border-brand-primary/10'>
                <h2 className='text-xl font-bold text-brand-primary'>
                    Create New Task
                </h2>

                <Button onClick={closeModal} variant={"transparent"}>
                    <X size={24} />
                </Button>
            </div>

            {/* form */}
            <form
                id='create-task'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6 p-6'>
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
                                    <FieldError errors={[fieldState.error]} />
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
                                    <FieldError errors={[fieldState.error]} />
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
                                        <SelectItem value='LOW'>Low</SelectItem>
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
                                <FieldLabel htmlFor='date'>Due Date</FieldLabel>
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
                                // isLoading={isLoading}
                                // isError={isError}
                                // customErr={customErr}
                                field={field}
                                fieldState={fieldState}
                            />
                        )}
                    />
                </FieldGroup>

                <div className='flex gap-3'>
                    <button
                        type='button'
                        onClick={closeModal}
                        disabled={createTaskMutation.isPending}
                        className='flex-1 bg-[#1a2332] hover:bg-[#0f1729] disabled:opacity-50 text-brand-primary py-2 rounded-lg
                         transition-colors border border-brand-gray'>
                        Cancel
                    </button>

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
                </div>
            </form>
        </div>
    );
}

export default CreateTaskModal;
