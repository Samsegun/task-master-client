import Button from "@/components/common/Button";
import PasswordRequirements from "@/components/common/PasswordRequirements";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useResetPassword } from "@/hooks/useAuth";
import { resetPasswordForm } from "@/lib/formValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Info } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";
import * as z from "zod";

function ResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordReqs, setShowPasswordReqs] = useState(false);
    const [searchParams] = useSearchParams();
    const resetPasswordMutation = useResetPassword();
    const form = useForm<z.infer<typeof resetPasswordForm>>({
        resolver: zodResolver(resetPasswordForm),
        defaultValues: {
            email: searchParams.get("email") || "",
            password: "",
        },
    });

    const token = searchParams.get("token");
    const emailFromParams = searchParams.get("email");

    async function onSubmit(values: z.infer<typeof resetPasswordForm>) {
        const { password } = values;

        console.log(token, password, emailFromParams);

        if (!token || !emailFromParams) {
            toast.error("Invalid or missing reset link parameters");
            return;
        }

        resetPasswordMutation.mutate({
            token,
            password,
            email: emailFromParams,
        });
    }

    return (
        <>
            <div className='text-center'>
                <h1 className='text-3xl font-extrabold'>Reset Password</h1>
            </div>

            <form
                id='reset-password'
                onSubmit={form.handleSubmit(onSubmit)}
                className='mt-8 space-y-6'>
                <FieldGroup>
                    <Controller
                        name='email'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor='register-user-email'>
                                    Email
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id='register-user-email'
                                    aria-invalid={fieldState.invalid}
                                    placeholder='user@mail.com'
                                    autoComplete='off'
                                    disabled
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name='password'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor='register-user-password'>
                                    New Password
                                </FieldLabel>

                                <div className='relative'>
                                    <Input
                                        {...field}
                                        id='register-user-password'
                                        aria-invalid={fieldState.invalid}
                                        placeholder='password'
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        autoComplete='off'
                                    />

                                    <button
                                        type='button'
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className='absolute inset-y-0 right-3 flex items-center text-sm
                                         text-brand-gray hover:cursor-pointer hover:text-brand-gray/80 '>
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <div>
                        <button
                            type='button'
                            aria-label='Show password requirements'
                            className='flex gap-2 hover:cursor-pointer'
                            onClick={() => setShowPasswordReqs(req => !req)}>
                            <Info />
                            <span>Password requirements:</span>
                        </button>

                        {showPasswordReqs && (
                            <PasswordRequirements
                                setShowPasswordReqs={setShowPasswordReqs}
                            />
                        )}
                    </div>
                </FieldGroup>

                <Button
                    type='submit'
                    variant={"primary"}
                    disabled={resetPasswordMutation.isPending}
                    form='reset-password'
                    className='w-full'>
                    {resetPasswordMutation.isPending ? "Resetting..." : "Reset"}
                </Button>
            </form>
        </>
    );
}

export default ResetPassword;
