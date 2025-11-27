interface AvatarProps {
    src: string;
    name: string;
    occupation: string;
}

function Avatar({ src, name, occupation }: AvatarProps) {
    return (
        <div className='flex items-center gap-2'>
            <div className='w-10 h-10 relative rounded-full overflow-hidden'>
                {/* <img src={src} alt='user pix' /> */}
                <span className='bg-brand-primary block w-10 h-10'>dd</span>
            </div>

            <div className='flex flex-col leading-tight capitalize'>
                <span className='text-sm font-medium '>{name}</span>
                <span className='text-xs text-gray-500'>{occupation}</span>
            </div>
        </div>
    );
}

export default Avatar;
