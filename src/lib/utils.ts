import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import type { TaskStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// check if task is overdue
export const isOverdue = (
    dueDate: Date | string | null,
    status: TaskStatus
) => {
    if (!dueDate) return false;
    if (status === "DONE") return false;
    return new Date(dueDate) < new Date();
};

// format date
export const formatDate = (dateString: Date | string | null) => {
    if (!dateString) return "No Due Date";

    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    today.setHours(0, 0, 0, 0);
    tomorrow.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) return "Today";
    if (date.getTime() === tomorrow.getTime()) return "Tomorrow";

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

export const validateEmailFromSearchParams = (
    searchParams: URLSearchParams
) => {
    const rawEmailFromParams = searchParams.get("email");
    const emailSchema = z.email();
    const validatedEmail = emailSchema.safeParse(rawEmailFromParams);
    const defaultEmail = validatedEmail.success ? validatedEmail.data : "";

    return defaultEmail;
};

export const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";

    return "Evening";
};
