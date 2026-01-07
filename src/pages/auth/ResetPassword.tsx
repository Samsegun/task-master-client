import Button from "@/components/common/Button";
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
import { Eye, EyeOff, Info, X } from "lucide-react";
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
            password: "",
        },
    });

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    async function onSubmit(values: z.infer<typeof resetPasswordForm>) {
        const { password } = values;

        if (!token || !email) {
            toast.error("Invalid or missing reset link parameters");
            return;
        }

        resetPasswordMutation.mutate({ token, password, email });
    }

    return (
        <>
            <div className='text-center'>
                <h1 className='text-3xl font-extrabold'>Reset Password</h1>
            </div>

            <form
                id='forgot-password'
                onSubmit={form.handleSubmit(onSubmit)}
                className='mt-8 space-y-6'>
                <FieldGroup>
                    <Controller
                        name='password'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor='register-user-password'>
                                    Password
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
                            <div className='bg-brand-modal font-semibold mt-2 p-4'>
                                <div className='text-right'>
                                    <button
                                        type='button'
                                        aria-label='Hide password requirements'
                                        className='hover:cursor-pointer'
                                        onClick={() =>
                                            setShowPasswordReqs(false)
                                        }>
                                        <X />
                                    </button>
                                </div>

                                <div>
                                    <ul>
                                        <li>- At least 8 characters</li>
                                        <li>- An uppercase letter</li>
                                        <li>- A lowercase letter</li>
                                        <li>- A number</li>
                                        <li>
                                            - At least one special character
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </FieldGroup>

                <Button
                    type='submit'
                    variant={"primary"}
                    disabled={resetPasswordMutation.isPending}
                    className='w-full'>
                    {resetPasswordMutation.isPending ? "Resetting..." : "Reset"}
                </Button>
            </form>
        </>
    );
}

export default ResetPassword;
