import React, { memo } from 'react'

const Footer = () => {
    return (
        <footer className="md:px-8 md:py-0 border-t sm:pb-0 pb-14">
            <div className="container flex  items-center gap-4 h-24">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by{' '}
                    <a
                        href="https://www.facebook.com/dungpv2209"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        DungPV
                    </a>
                    , contact me at{' '}
                    <a
                        href="mailto:phamdung.22092003@gmail.com"
                        className="font-medium underline underline-offset-4"
                    >
                        phamdung.22092003@gmail.com
                    </a>
                </p>
            </div>
        </footer>
    )
}

export default memo(Footer)
