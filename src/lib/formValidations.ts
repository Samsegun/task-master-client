import * as z from "zod";

const registerUserForm = z.object({
    email: z.email("Invalid email format"),
    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
            /[@$!%*?&]/,
            "Password must contain at least one special character"
        ),
});

const loginUserForm = z.object({
    email: z.email("Invalid email format"),
    password: z.string().trim().nonempty("Password is required"),
});

const forgotPasswordForm = registerUserForm.omit({
    password: true,
});

const resetPasswordForm = z.object({
    token: z.string().trim(),
    password: registerUserForm.shape.password,
});

export {
    forgotPasswordForm,
    loginUserForm,
    registerUserForm,
    resetPasswordForm,
};
