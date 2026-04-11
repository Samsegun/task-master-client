interface AvatarProps {
    src: string;
    name: string;
    occupation: string;
}

function Avatar({ src, name, occupation }: AvatarProps) {
    return (
        <div className='flex items-center gap-2'>
            <div className='w-10 h-10 relative bg-brand-button flex justify-center items-center rounded-full overflow-hidden'>
                {/* <img src={src} alt='user pix' /> */}
                <span>{name.charAt(0)}</span>
            </div>

            <div className='flex flex-col text-left leading-tight capitalize'>
                <span className='text-sm font-medium '>{name}</span>
                {/* <span className='text-xs text-brand-gray'>{occupation}</span> */}
            </div>
        </div>
    );
}

export default Avatar;
