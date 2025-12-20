import { addProjectMember } from "@/lib/formValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useMenu } from "../Menu/MenuContext";
import Button from "../common/Button";
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

interface AddMemberModalProps {
    projectId: string;
}

type AddMemberFormData = z.input<typeof addProjectMember>;

function AddMemberModal({ projectId }: AddMemberModalProps) {
    const form = useForm<AddMemberFormData>({
        resolver: zodResolver(addProjectMember),
        defaultValues: {
            email: "",
            role: "MEMBER",
        },
    });

    const role = form.watch("role");

    function closeModal() {
        form.reset();
        onClose();
    }

    function onSubmit(data: AddMemberFormData) {
        console.log(data, projectId);

        form.reset();
        onClose();
    }

    const { onClose } = useMenu();

    return (
        <div className='rounded-lg border border-nav-border h-full'>
            {/* header */}
            <div className='flex justify-between items-center p-4 border-b border-brand-primary/10'>
                <h2 className='text-xl font-bold text-brand-primary'>
                    Add Team Member
                </h2>

                <Button onClick={closeModal} variant={"transparent"}>
                    <X size={24} />
                </Button>
            </div>

            {/* form */}
            <form
                id='add-member'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6 p-6'>
                <FieldGroup>
                    {/* email */}
                    <Controller
                        name='email'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor='member-email'>
                                    Email
                                    <span className='text-red-500'>*</span>
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id='member-email'
                                    aria-invalid={fieldState.invalid}
                                    placeholder='user@mail.com'
                                    autoComplete='off'
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    {/* role */}
                    <Controller
                        name='role'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <>
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldContent className='block'>
                                        <FieldLabel htmlFor='member-role'>
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
                                        onValueChange={field.onChange}>
                                        <SelectTrigger
                                            id='member-role'
                                            aria-invalid={fieldState.invalid}>
                                            <SelectValue placeholder='Select' />
                                        </SelectTrigger>

                                        <SelectContent
                                            position='item-aligned'
                                            className='bg-[#263447]'>
                                            <SelectItem value='MEMBER'>
                                                Member
                                            </SelectItem>
                                            <SelectItem value='OWNER'>
                                                Owner
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>

                                {/* role descriptions */}
                                <div className=' space-y-2 text-xs'>
                                    <div className='flex items-start gap-2 text-gray-400'>
                                        <span className='font-medium text-gray-300'>
                                            Member:
                                        </span>
                                        <span>Can create and edit tasks</span>
                                    </div>
                                    <div className='flex items-start gap-2 text-gray-400'>
                                        <span className='font-medium text-gray-300'>
                                            Owner:
                                        </span>
                                        <span>
                                            Full access to project settings and
                                            member management
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    />
                </FieldGroup>

                {/* warning for Owner role */}
                {role === "OWNER" && (
                    <div className='mb-6 bg-orange-500/10 border border-orange-500/30 rounded-lg p-3'>
                        <p className='text-orange-400 text-sm flex gap-2 items-center'>
                            <CircleAlert />{" "}
                            <span className='font-bold'>
                                Promoting Member to Owner will demote you to
                                Member role
                            </span>
                        </p>
                    </div>
                )}

                <div className='flex gap-3'>
                    <button
                        type='button'
                        onClick={closeModal}
                        className='flex-1 bg-[#1a2332] hover:bg-[#0f1729] text-brand-primary py-2 rounded-lg
                         transition-colors border border-brand-gray'>
                        Cancel
                    </button>

                    <Button
                        type='submit'
                        variant={"primary"}
                        form='add-member'
                        // disabled={isSubmitting}
                        className='flex-1'>
                        {/* {isSubmitting ? "Creating..." : "Create Task"} */}
                        Add Member
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddMemberModal;
