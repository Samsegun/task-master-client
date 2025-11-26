import Button from "@/components/common/Button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUserForm } from "@/lib/formValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import * as z from "zod";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof loginUserForm>>({
        resolver: zodResolver(loginUserForm),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: z.infer<typeof loginUserForm>) {
        console.log(data);
    }

    return (
        <>
            <div className='text-center'>
                <h1 className='text-3xl font-extrabold'>Login</h1>

                <p>
                    or{" "}
                    <span
                        className='font-medium text-brand-link text-sm
                         hover:text-brand-link/90'>
                        <Link to={"/register"}>
                            create account if you don't have one
                        </Link>
                    </span>
                </p>
            </div>

            <form
                id='login-user'
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
                                        className=''
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
                </FieldGroup>

                <Button
                    type='submit'
                    form='login-user'
                    variant={"primary"}
                    className='w-full mt-4'>
                    Create account
                </Button>
            </form>
        </>
    );
}

export default Login;
