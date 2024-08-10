'use client'

import * as Ably from 'ably'
import { AblyProvider, ChannelProvider } from 'ably/react'

import { TPostWithComments } from '../post'
import config from '~/configs'
import ContainerComment from './container-comment'

const client = new Ably.Realtime({ key: config.ablyKey })

const DialogComment = ({
    isSubscribed,
    post,
}: {
    isSubscribed: boolean
    post: TPostWithComments
}) => {
    return (
        <AblyProvider client={client}>
            <ChannelProvider channelName="chat_comments">
                <ContainerComment isSubscribed={isSubscribed} post={post} />
            </ChannelProvider>
        </AblyProvider>
    )
}

export default DialogComment
