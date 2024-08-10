'use client'

import { ArrowBigUpDash } from 'lucide-react'
import { memo, useCallback, useEffect, useState } from 'react'

const GoToTop = () => {
    const [show, setShow] = useState<boolean>(false)

    const handleScroll = useCallback(() => {
        if (window.scrollY > 100) setShow(true)
        else setShow(false)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    return (
        <ArrowBigUpDash
            className={`transition-transform duration-300 ease-in-out fixed text-white bottom-20 sm:bottom-4 right-4 cursor-pointer h-9 w-9 text-primary-foreground rounded-full p-2 bg-primary active:opacity-80 ${
                show ? 'translate-y-0' : 'translate-y-16'
            }`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
    )
}

export default memo(GoToTop)
