// components/RouterErrorFallback.tsx
import ErrorFallback from "@/components/common/ErrorFallBack";
import { useNavigate, useRouteError } from "react-router";

function RouterErrorFallback() {
    const error = useRouteError();
    const navigate = useNavigate();

    const handleReset = () => {
        // instead of resetErrorBoundary, we just navigate to home or refresh
        navigate("/");
        window.location.reload();
    };

    return (
        <div role='alert'>
            <ErrorFallback
                error={error as Error}
                resetErrorBoundary={handleReset}
            />
        </div>
    );
}

export default RouterErrorFallback;
