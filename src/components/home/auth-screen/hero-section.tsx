import Image from 'next/image'
import React, { memo } from 'react'
import AuthButton from './auth-button'

const HeroSection = () => {
    return (
        <div className="flex h-svh w-full">
            <div className="flex-1 flex overflow-hidden bg-[#00b0f0a6] relative justify-center items-center z-10 bg-noise">
                <Image
                    src="/of-logo.svg"
                    alt="Only Horse"
                    width={100}
                    height={100}
                    className="w-auto h-auto absolute -left-1/4 opacity-15 -bottom-52 lg-scale-150 xl-scale-105 scale-[2] pointer-events-none select-none"
                />

                <div className="flex flex-col gap-2 px-4 xl:ml-40 text-center md:text-start font-semibold">
                    <Image
                        src={'/onlyhorse.png'}
                        alt="Only Horse Logo"
                        width={769}
                        height={182}
                        className="mt-2 sm:mt-20 w-[420px] z-0 pointer-events-none select-none"
                    />

                    <p className="text-2xl md:text-3xl text-balance">
                        Hey! It's{' '}
                        <span className="uppercase bg-stone-500 font-bold px-2 text-white">
                            Not
                        </span>{' '}
                        what it look like.
                    </p>
                    <p className="text-2xl md:text-3xl mb-10 sm:mb-32 leading-snug text-balance">
                        Built for{' '}
                        <span className="uppercase bg-sky-500 px-2 text-white">horses</span> NOT{' '}
                        <span className="bg-red-500 px-2 font-bold text-white uppercase">
                            others
                        </span>
                    </p>

                    <AuthButton />
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden justify-center items-center md:flex hidden">
                <Image
                    src={'/horse-1.png'}
                    alt="Horse"
                    fill
                    sizes="(min-width: 1024px) auto, auto"
                    className="object-cover opacity-90 pointer-events-none select-none h-full"
                />
            </div>
        </div>
    )
}

export default memo(HeroSection)
