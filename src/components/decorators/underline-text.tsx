import { memo } from 'react'

import { cn } from '~/lib/utils'

const UnderlineText = ({
    children,
    className,
}: {
    children?: React.ReactNode
    className?: string
}) => {
    return (
        <span
            className={cn(
                'underline underline-offset-4 decoration-dashed decoration-primary',
                className,
            )}
        >
            {children}
        </span>
    )
}

export default memo(UnderlineText)
