import * as z from "zod";

// enums
const TaskPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH"]);
const TaskStatusSchema = z.enum(["TODO", "IN_PROGRESS", "DONE"]);
const AddMemberSchema = z.enum(["OWNER", "MEMBER"]);

// auth
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
    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be at most 30 characters")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username may contain letters, numbers and underscores only"
        ),
});

// const loginUserForm = z.object({
//     email: z.email("Invalid email format"),
//     password: z.string().trim().nonempty("Password is required"),
// });
// user should be able to login with either email or username
const loginUserForm = z.object({
    emailOrusername: z
        .string()
        .trim()
        .refine(
            value => {
                const isEmail = z.email().safeParse(value).success;
                const isUsername = /^[a-zA-Z0-9_]+$/.test(value);

                return isEmail || isUsername;
            },
            {
                message: "Enter a valid email or username",
            }
        ),
    password: z.string().trim(),
});

const forgotPasswordForm = registerUserForm.omit({
    password: true,
});

const resetPasswordForm = z.object({
    token: z.string().trim(),
    password: registerUserForm.shape.password,
});

// task
const createTaskForm = z.object({
    title: z.string().min(5).max(200),
    description: z.string().max(1000).optional(),
    dueDate: z.coerce.date().optional().nullable(),
    priority: TaskPrioritySchema.optional().default("MEDIUM"),
    assigneeId: z.string().optional().nullable(),
});

const editTaskForm = z.object({
    title: z.string().min(5).max(200),
    description: z.string().max(1000).optional(),
    dueDate: z.coerce.date().optional().nullable(),
    priority: TaskPrioritySchema.optional(),
    status: TaskStatusSchema.optional(),
    assigneeId: z.string().optional().nullable(),
});

// project
const createProject = z.object({
    name: z.string().min(3).max(100),
    description: z.string().max(500).optional(),
});
const addProjectMember = z.object({
    email: z.email("Invalid email format"),
    role: AddMemberSchema.default("MEMBER"),
});

export {
    addProjectMember,
    createProject,
    createTaskForm,
    editTaskForm,
    forgotPasswordForm,
    loginUserForm,
    registerUserForm,
    resetPasswordForm,
};
