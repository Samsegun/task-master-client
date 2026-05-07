import { Skeleton } from "../ui/skeleton";
import PageTitle from "./PageTitle";

type TitlesProps = { isLoading: boolean; name: string; description: string };

function ProjectDetailsTitles({ isLoading, name, description }: TitlesProps) {
    return (
        <div>
            {isLoading ? (
                <div className='space-y-2'>
                    <Skeleton className='h-8 w-56 md:w-72 bg-brand-table-header' />
                    <Skeleton className='h-6 w-52 md:w-56 bg-brand-table-header' />
                </div>
            ) : (
                <>
                    <PageTitle className=' mb-2 capitalize'>{name}</PageTitle>
                    <p className='text-brand-gray'>{description}</p>
                </>
            )}
        </div>
    );
}

export default ProjectDetailsTitles;
