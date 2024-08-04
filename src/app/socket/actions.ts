'use server'

import { io } from '../api/socket/route'

// send message to all clients
export const sendMessages = async (message: string) => {
    io.emit('sendMessage', message)
}
