'use client'

import Image from 'next/image'
import { memo, useCallback, useState } from 'react'

const MasonryGrid = () => {
    const [hoverIdx, setHoverIdx] = useState<number | null>(null)
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
            if (hoverIdx === idx) {
                const rect = (e.target as HTMLDivElement).getBoundingClientRect()
                const x = ((e.clientX - rect.left) / rect.width) * 100
                const y = ((e.clientY - rect.top) / rect.height) * 100

                setMousePos({ x, y })
            }
        },
        [hoverIdx],
    )

    return (
        <div className="p-5 sm:p-8">
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [&>div:not(:first-child)]:mt-4">
                {Array.from({ length: 15 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="relative overflow-hidden rounded-md"
                        onMouseEnter={() => setHoverIdx(idx)}
                        onMouseLeave={() => setHoverIdx(null)}
                        onMouseMove={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                            handleMouseMove(e, idx)
                        }
                    >
                        <Image
                            src={`/featured/featured${idx + 1}.jpg`}
                            alt="Hero Section Image"
                            className="cursor-pointer  hover:scale-150 transition-transform duration-300 ease-in-out"
                            width={500}
                            height={500}
                            style={{ transformOrigin: `${mousePos.x}% ${mousePos.y}%` }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(MasonryGrid)
