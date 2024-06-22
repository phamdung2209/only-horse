'use client'

import { memo } from 'react'
import 'next-cloudinary/dist/cld-video-player.css'
import { CldVideoPlayer } from 'next-cloudinary'

const TodayHighlight = () => {
    return (
        <div className="w-full md:w-3/4 mx-auto">
            <CldVideoPlayer
                width={960}
                height={540}
                className="rounded-md shadow-md"
                src="horse/ldogna5daa1w974oe7x7"
            />
        </div>
    )
}

export default memo(TodayHighlight)
