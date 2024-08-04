import { NextRequest } from 'next/server'
import { Server } from 'socket.io'

export const io = new Server(8080, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

export const GET = async (req: NextRequest) => {
    try {
        io.on('connection', (socket) => {
            console.log('A user connected', socket.id)

            socket.on('sendMessage', (message) => {
                console.log('Message: 1', message)
                io.emit('sendMessage', message)
            })

            io.on('disconnect', () => {
                console.log('User disconnected', socket.id)
            })
        })

        return Response.json({ message: 'Socket server is running' })
    } catch (error: any) {
        console.log('Error in GET /api/socket', error.message)
        return Response.json({ error: error.message })
    }
}
