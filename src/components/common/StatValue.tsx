import { StatSkeleton } from "../LoadingSkeletons/TasksSkeletons";

function StatValue({
    isLoading,
    value,
    className,
}: {
    isLoading: boolean;
    value: number;
    className?: string;
}) {
    return isLoading ? (
        <StatSkeleton />
    ) : (
        <p className={`text-2xl font-bold ${className}`}>{value}</p>
    );
}

export default StatValue;
