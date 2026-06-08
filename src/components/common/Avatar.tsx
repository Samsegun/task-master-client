interface AvatarProps {
    name: string;
}

function Avatar({ name }: AvatarProps) {
    return (
        <div className="flex items-center gap-2 capitalize">
            <div className="w-10 h-10 relative bg-brand-button flex justify-center items-center rounded-full overflow-hidden">
                <span className="">{name.charAt(0)}</span>
            </div>

            <div className="flex flex-col text-left leading-tight">
                <span className="text-sm font-medium ">{name}</span>
            </div>
        </div>
    );
}

export default Avatar;
