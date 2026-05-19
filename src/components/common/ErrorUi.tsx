import { Frown } from "lucide-react";

function ErrorUi({
    error,
}: {
    error: Error | null | { message: string; code: string };
}) {
    return (
        <div className="font-bold text-xl flex flex-col items-center justify-center">
            <span className="flex items-center justify-center gap-2 text-destructive">
                Something went wrong <Frown size={20} />
            </span>
            <span>{error?.message}</span>
        </div>
    );
}

export default ErrorUi;
