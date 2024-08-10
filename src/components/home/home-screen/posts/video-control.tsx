'use client'

import { CldVideoPlayer } from 'next-cloudinary'
import { memo } from 'react'

const VideoControl = ({ mediaUrl }: { mediaUrl: string }) => {
    return <CldVideoPlayer width={960} height={540} className="rounded-lg" src={mediaUrl} />
}

export default memo(VideoControl)
