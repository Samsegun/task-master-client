import type { JSX } from "react";
import { StatSkeleton } from "../LoadingSkeletons/AppSkeletons";

function StatValue({
    isLoading,
    value,
    className,
}: {
    isLoading: boolean;
    value: number | JSX.Element;
    className?: string;
}) {
    return isLoading ? (
        <StatSkeleton />
    ) : (
        <p className={`text-2xl font-bold ${className}`}>{value}</p>
    );
}

export default StatValue;
