import { useCreateProject } from "@/hooks/useProjects";
import { createProject } from "@/lib/formValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useDialog } from "../Dialog/DialogContext";
import Button from "../common/Button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

type CreateProjectFormData = z.input<typeof createProject>;

const CreateProjectModal = () => {
    const createProjectMutation = useCreateProject();
    const form = useForm<CreateProjectFormData>({
        resolver: zodResolver(createProject),
        defaultValues: {
            name: "",
            description: "",
        },
    });
    const { closeDialog } = useDialog();

    function onSubmit(data: CreateProjectFormData) {
        createProjectMutation.mutate(data, {
            onSuccess: () => {
                form.reset();
                closeDialog();
            },
            onError: (err: any) => {
                console.log(err);
            },
        });
    }

    function closeModal() {
        form.reset();
        closeDialog();
    }

    return (
        <div className='rounded-lg border border-nav-border'>
            {/* header */}
            <div className='flex justify-between items-center p-6 border-b border-brand-primary/10'>
                <h2 className='text-xl font-bold text-brand-primary'>
                    Create New Project
                </h2>

                <Button onClick={closeModal} variant={"transparent"}>
                    <X size={24} />
                </Button>
            </div>

            {/* form */}
            <form
                id='create-project'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6 p-6'>
                <FieldGroup>
                    {/* project name */}
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
                                    className='px-4 py-5'
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
                                <FieldLabel htmlFor='project-description'>
                                    Description
                                </FieldLabel>
                                <textarea
                                    {...field}
                                    id='project-description'
                                    aria-invalid={fieldState.invalid}
                                    placeholder='Enter project description (optional)'
                                    rows={4}
                                    className='bg-brand-card border border-brand-primary 
                                    rounded-lg px-4 py-2 resize-none'
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>

                {/* info */}
                <div className='mb-6 bg-brand-button/10 border border-brand-button/30 rounded-lg p-3'>
                    <p className='text-blue-400 text-sm flex items-center gap-2 font-semibold'>
                        <CircleAlert size={40} /> You will be automatically
                        added as the project owner and can invite team members
                        after creation.
                    </p>
                </div>

                {/* buttons */}
                <div className='flex gap-3'>
                    <button
                        type='button'
                        onClick={closeModal}
                        disabled={createProjectMutation.isPending}
                        className='flex-1 bg-[#1a2332] hover:bg-[#0f1729] disabled:opacity-50 text-brand-primary
                         py-2 rounded-lg transition-colors border border-brand-gray'>
                        Cancel
                    </button>

                    <Button
                        type='submit'
                        variant={"primary"}
                        form='create-project'
                        disabled={createProjectMutation.isPending}
                        className={`flex-1 ${
                            createProjectMutation.isPending &&
                            "cursor-not-allowed"
                        }`}>
                        {createProjectMutation.isPending
                            ? "Creating..."
                            : "Create Project"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateProjectModal;
