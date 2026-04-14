import { useAuthStatus } from "@/hooks/useAuth";
import { useUpdateUserProfile } from "@/hooks/useUser";
import { updateProfile } from "@/lib/formValidations";
import { zodResolver } from "@hookform/resolvers/zod";
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

type UpdateProfileFormData = z.input<typeof updateProfile>;

function UserProfileUpdateForm() {
    const { user } = useAuthStatus();
    const form = useForm<UpdateProfileFormData>({
        resolver: zodResolver(updateProfile),
        defaultValues: {
            email: user?.email || "",
            firstName: user?.firstName || "",
            lastName: user?.lasttName || "",
            username: user?.username || "",
        },
    });

    const updateUserProfileMutation = useUpdateUserProfile();

    function onSubmit(data: UpdateProfileFormData) {
        const { username, firstName, lastName } = data;

        updateUserProfileMutation.mutate({ username, firstName, lastName });
    }

    return (
        <FormWrapper>
            <form
                id='update-user-profile'
                onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller
                        name='email'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <LabelInputWrapper>
                                    <FieldLabel
                                        htmlFor='user-email'
                                        className='basis-[20%]'>
                                        Email
                                    </FieldLabel>

                                    <InputWrapper>
                                        <Input
                                            {...field}
                                            id='user-email'
                                            aria-invalid={fieldState.invalid}
                                            placeholder='user@mail.com'
                                            value={user?.email}
                                            disabled
                                            autoComplete='off'
                                            className='py-4 px-3 cursor-not-allowed'
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
                        name='username'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <LabelInputWrapper>
                                    <FieldLabel
                                        htmlFor='update-username'
                                        className='basis-[20%]'>
                                        Username
                                        <span className='text-red-500 pr-2'>
                                            *
                                        </span>
                                    </FieldLabel>

                                    <InputWrapper>
                                        <Input
                                            {...field}
                                            id='update-username'
                                            aria-invalid={fieldState.invalid}
                                            placeholder='user123'
                                            autoComplete='off'
                                            className='py-4 px-3'
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
                        name='firstName'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <LabelInputWrapper>
                                    <FieldLabel
                                        htmlFor='update-firstName'
                                        className='basis-[20%]'>
                                        First Name
                                    </FieldLabel>

                                    <InputWrapper>
                                        <Input
                                            {...field}
                                            id='update-firstName'
                                            aria-invalid={fieldState.invalid}
                                            placeholder='First name'
                                            autoComplete='off'
                                            className='py-4 px-3'
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
                        name='lastName'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <LabelInputWrapper>
                                    <FieldLabel
                                        htmlFor='update-lastName'
                                        className='basis-[20%]'>
                                        Last Name
                                    </FieldLabel>

                                    <InputWrapper>
                                        <Input
                                            {...field}
                                            id='update-lastName'
                                            aria-invalid={fieldState.invalid}
                                            placeholder='Last name'
                                            autoComplete='off'
                                            className='py-4 px-3'
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

                <div className='flex justify-center mt-5 md:mt-8 md:w-4/5'>
                    <Button
                        type='submit'
                        disabled={updateUserProfileMutation.isPending}
                        form='update-user-profile'
                        variant={"primary"}
                        className='basis-full md:basis-6/12'>
                        {updateUserProfileMutation.isPending
                            ? "Updating profile..."
                            : "Update profile"}
                    </Button>
                </div>
            </form>
        </FormWrapper>
    );
}

export default UserProfileUpdateForm;
