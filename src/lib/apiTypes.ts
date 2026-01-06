type Role = "USER" | "MODERATOR" | "ADMIN" | "SUPER_ADMIN";

export type RegisterUser = {
    success: boolean;
    message: string;
    user: {
        id: string;
        email: string;
        isVerified: boolean;
    };
};

export type LoginUser = {
    success: boolean;
    user: {
        id: string;
        email: string;
        username: string;
        role: Role;
        isVerified: boolean;
    };
};

export type LogoutUser = Omit<RegisterUser, "user">;

export type VerifyEmail = {
    success: boolean;
    message: string;
    user: {
        id: string;
        email: string;
        role: Role;
        isVerified: boolean;
        verificationToken: string;
    };
};

export type ForgotPassword = Omit<RegisterUser, "user">;

export type ResetPassword = Omit<RegisterUser, "user">;

export type UserCredentials = {
    email: string;
    password: string;
};

// type ResetPasswordDetails = {
//     token: string;
//     password: string;
//     email: string;
// };

// export const AUTH_STATUS_QUERY_KEY = ["authStatus"] as const;
