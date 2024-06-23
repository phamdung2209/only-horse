import { memo } from 'react'

const RotatedText = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className="relative whitespace-nowrap">
            <span
                className="absolute bg-sky-500 -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-2 mx-2"
                aria-hidden="true"
            />

            <span className="relative uppercase">{children}</span>
        </span>
    )
}

export default memo(RotatedText)
