import { memo } from 'react'

const Loading = ({ className, ...props }: { className?: string; props?: any }) => {
    return (
        <div
            className={`animate-spin h-5 w-5 border-t-2 border-b-2 border-[#00b0f0] rounded-full ${className}`}
            {...props}
        />
    )
}

export default memo(Loading)
