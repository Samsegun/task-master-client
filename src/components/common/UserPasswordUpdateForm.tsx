import { useUpdateUserPassword } from "@/hooks/useUser";
import { updatePassword } from "@/lib/formValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import Button from "./Button";
import {
    FormWrapper,
    InputWrapper,
    LabelInputWrapper,
} from "./UserUpdateInputWrappers";

type UpdatePasswordFormData = z.input<typeof updatePassword>;

function UserPasswordUpdateForm() {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<UpdatePasswordFormData>({
        resolver: zodResolver(updatePassword),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
        },
    });

    const updateUserPasswordMutation = useUpdateUserPassword();

    function onSubmit(data: UpdatePasswordFormData) {
        const { currentPassword, newPassword } = data;

        updateUserPasswordMutation.mutate({ currentPassword, newPassword });
    }

    return (
        <FormWrapper>
            <form
                id='update-user-password'
                onSubmit={form.handleSubmit(onSubmit)}
                className='relative'>
                <FieldGroup>
                    <Controller
                        name='currentPassword'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <LabelInputWrapper>
                                    <FieldLabel
                                        htmlFor='current-user-password'
                                        className='basis-[20%]'>
                                        Current Password
                                    </FieldLabel>

                                    <InputWrapper>
                                        <Input
                                            {...field}
                                            id='current-user-password'
                                            aria-invalid={fieldState.invalid}
                                            placeholder='Current password'
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            autoComplete='off'
                                        />
                                    </InputWrapper>
                                </LabelInputWrapper>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name='newPassword'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <LabelInputWrapper>
                                    <FieldLabel
                                        htmlFor='new-user-password'
                                        className='basis-[20%]'>
                                        New Password
                                    </FieldLabel>

                                    <InputWrapper>
                                        <Input
                                            {...field}
                                            id='new-user-password'
                                            aria-invalid={fieldState.invalid}
                                            placeholder='New password'
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            autoComplete='off'
                                        />
                                    </InputWrapper>
                                </LabelInputWrapper>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>

                {/* show passwords icon */}
                <button
                    type='button'
                    title={`${showPassword ? "Hide" : "Show"} paswwords`}
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute top-0 right-0 flex items-center text-sm
                                         text-brand-gray hover:cursor-pointer hover:text-brand-gray/80 '>
                    {showPassword ? <EyeOff /> : <Eye />}
                </button>

                <div className='flex justify-center mt-5 md:mt-8 md:w-4/5'>
                    <Button
                        type='submit'
                        disabled={updateUserPasswordMutation.isPending}
                        form='update-user-password'
                        variant={"primary"}
                        className='basis-full md:basis-6/12'>
                        {updateUserPasswordMutation.isPending
                            ? "Updating password..."
                            : "Update password"}
                    </Button>
                </div>
            </form>
        </FormWrapper>
    );
}

export default UserPasswordUpdateForm;
