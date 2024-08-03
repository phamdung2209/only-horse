'use client'

import { CldVideoPlayer } from 'next-cloudinary'

const VideoControl = ({ mediaUrl }: { mediaUrl: string }) => {
    return <CldVideoPlayer width={960} height={540} className="rounded-lg" src={mediaUrl} />
}

export default VideoControl
