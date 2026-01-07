import Button from "@/components/common/Button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/useAuth";
import { forgotPasswordForm } from "@/lib/formValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

function ForgotPassword() {
    const forgotPasswordMutation = useForgotPassword();

    const form = useForm<z.infer<typeof forgotPasswordForm>>({
        resolver: zodResolver(forgotPasswordForm),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof forgotPasswordForm>) {
        const { email } = values;

        forgotPasswordMutation.mutate({ email });
    }

    return (
        <>
            <div className='text-center'>
                <h1 className='text-3xl font-extrabold'>Forgot Password</h1>
            </div>

            <form
                id='forgot-password'
                onSubmit={form.handleSubmit(onSubmit)}
                className='mt-8 space-y-6'>
                <FieldGroup>
                    <Controller
                        name='email'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor='user-email'>
                                    Enter Email:
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id='user-email'
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
                </FieldGroup>

                <Button
                    type='submit'
                    variant={"primary"}
                    disabled={forgotPasswordMutation.isPending}
                    className='w-full'>
                    {forgotPasswordMutation.isPending
                        ? "Submitting..."
                        : "Submit"}
                </Button>
            </form>
        </>
    );
}

export default ForgotPassword;
