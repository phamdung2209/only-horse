'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { cn } from '~/lib/utils'

const ZoomedImage = ({ className, imgSrc }: { className?: string; imgSrc: string }) => {
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const imgRef = useRef<HTMLImageElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = (e.target as HTMLDivElement).getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100

        setMousePosition({ x, y })
    }

    return (
        <div
            className={cn('w-full relative overflow-hidden h-96 rounded-md', className)}
            onMouseMove={(e) => handleMouseMove(e)}
        >
            <Image
                src={imgSrc}
                fill
                alt=""
                style={{ transformOrigin: `${mousePosition.x}% ${mousePosition.y}%` }}
                className="transition-transform duration-300 ease-in-out transform hover:scale-[2.5] cursor-pointer rounded-md select-none"
                ref={imgRef}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
        </div>
    )
}

export default ZoomedImage
