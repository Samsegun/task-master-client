import type { UserCredentials } from "@/lib/apiTypes";
import { registerUser } from "@/services/ApiRequests";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useRegisterUser = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ email, password }: UserCredentials) =>
            registerUser(email, password),
        onSuccess: () => {
            navigate("/email-verification-sent");
        },
        onError: (err: any) => {
            console.log(err);
            toast.error(err.response.data.message);
        },
    });
};
