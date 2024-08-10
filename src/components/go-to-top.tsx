'use client'

import { ArrowBigUpDash } from 'lucide-react'
import { memo, useCallback, useEffect, useState } from 'react'

const GoToTop = () => {
    const [show, setShow] = useState<boolean>(false)

    const handleScroll = useCallback(() => {
        if (window.pageYOffset > 100) setShow(true)
        else setShow(false)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    return (
        <ArrowBigUpDash
            className={`translate-y-40 opacity-0 transition-all fixed text-white bottom-20 sm:bottom-4 right-4 cursor-pointer h-9 w-9 text-primary-foreground rounded-full p-2 bg-primary active:opacity-80 ${
                show && 'opacity-100 translate-y-0'
            }`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
    )
}

export default memo(GoToTop)
