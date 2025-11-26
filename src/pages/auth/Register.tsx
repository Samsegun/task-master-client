import Button from "@/components/common/Button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerUserForm } from "@/lib/formValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Info, X } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import * as z from "zod";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordReqs, setShowPasswordReqs] = useState(false);

    const form = useForm<z.infer<typeof registerUserForm>>({
        resolver: zodResolver(registerUserForm),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: z.infer<typeof registerUserForm>) {
        console.log(data);
    }

    return (
        <>
            <div className='text-center'>
                <h1 className='text-3xl font-extrabold'>Create your account</h1>

                <p>
                    or{" "}
                    <span
                        className='font-medium text-brand-link text-sm
                         hover:text-brand-link/90'>
                        <Link to={"/login"}>
                            log in if you already have an account{" "}
                        </Link>
                    </span>
                </p>
            </div>

            <form
                id='register-user'
                onSubmit={form.handleSubmit(onSubmit)}
                className='mt-8 space-y-6'>
                <FieldGroup>
                    {" "}
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
                            <div className='bg-brand-gray/80 font-semibold mt-2 p-4'>
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
                    form='register-user'
                    variant={"primary"}
                    className='w-full mt-4'>
                    Create account
                </Button>
            </form>
        </>
    );
}

export default Register;
