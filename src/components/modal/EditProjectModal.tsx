import { useUpdateProject } from "@/hooks/useProjects";
import { updateProjectForm } from "@/lib/formValidations";
import type { ProjectStatus } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type EditProjectProps = {
    project: {
        projectId: string;
        projectName: string;
        projectStatus: ProjectStatus;
        projectDescription?: string;
    };
    isOpen: boolean;
    onClose: () => void;
};

type UpdateProjectFormData = z.input<typeof updateProjectForm>;

function EditProjectModal({ project, isOpen, onClose }: EditProjectProps) {
    const form = useForm<UpdateProjectFormData>({
        resolver: zodResolver(updateProjectForm),
        defaultValues: {
            description: project.projectDescription || "",
            name: project.projectName || "",
            status: project.projectStatus || "",
        },
    });

    const updateProjectMutation = useUpdateProject();

    function onSubmit(data: UpdateProjectFormData) {
        updateProjectMutation.mutate(
            { projectId: project.projectId, payLoad: data },
            {
                onSuccess: () => onClose(),
            }
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <form id='update-project' onSubmit={form.handleSubmit(onSubmit)}>
                <FormContentWrapper>
                    <DialogHeader className='border-b border-brand-primary/10'>
                        <DialogTitle className="text-xl font-bold text-brand-primary'">
                            Edit Project
                        </DialogTitle>

                        <DialogDescription className='sr-only'>
                            Edit project details: change name, description, and
                            status.
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup>
                        {/* name */}
                        <Controller
                            name='name'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor='project-name'>
                                        Project Name{" "}
                                        <span className='text-red-500'>*</span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id='project-name'
                                        aria-invalid={fieldState.invalid}
                                        placeholder='Enter project name'
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
                                    <FieldLabel htmlFor='project-description'>
                                        Description
                                    </FieldLabel>
                                    <textarea
                                        {...field}
                                        id='project-description'
                                        aria-invalid={fieldState.invalid}
                                        placeholder='Enter project description (optional)'
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
                    </FieldGroup>

                    <DialogFooter className='flex gap-3'>
                        <DialogClose
                            asChild
                            disabled={updateProjectMutation.isPending}>
                            <button
                                type='button'
                                onClick={() => form.reset()}
                                className='flex-1 bg-[#1a2332] hover:bg-[#0f1729] cursor-pointer
                                                         disabled:opacity-50 text-brand-primary py-2 rounded-lg
                                             transition-colors border border-brand-gray'>
                                Cancel
                            </button>
                        </DialogClose>

                        <Button
                            type='submit'
                            disabled={updateProjectMutation.isPending}
                            variant={"primary"}
                            form='update-project'
                            className='flex-1'>
                            {updateProjectMutation.isPending
                                ? "Updating Project..."
                                : "Update Project"}
                        </Button>
                    </DialogFooter>
                </FormContentWrapper>
            </form>
        </Dialog>
    );
}

export default EditProjectModal;
