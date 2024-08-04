'use client'

import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { sendMessages } from './actions'
import config from '~/configs'
import { Button } from '~/components/ui/button'
const socket = io(config.socketUrl)
console.log('config.socketUrl', config.socketUrl)

const Page = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<string[]>([])
    const [room, setRoom] = useState('')

    useEffect(() => {
        socket.on('receive_message', (message: string) => {
            console.log('receive_message', message)

            setMessages([...messages, message])
        })
    }, [messages])

    return (
        <div>
            SOcket.io
            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    socket.emit('send_message', message, room)
                }}
            >
                <input
                    type="text"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button type="submit">Send</button>
            </form>
            <input type="text" id="room" value={room} onChange={(e) => setRoom(e.target.value)} />
            <button
                onClick={() => {
                    socket.emit('join_room', room)
                }}
            >
                Join Room
            </button>
            <br />
            <Button onClick={() => socket.disconnect()}>Disconnect</Button>
            <br />
            <Button onClick={() => socket.connect()}>Connect</Button>
            {messages.map((msg, index) => (
                <div key={index}>{msg}</div>
            ))}
        </div>
    )
}

export default Page
