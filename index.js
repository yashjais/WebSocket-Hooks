const express = require('express')
const app = express()
const socket = require('socket.io')

const port = 3010

const server = app.listen(port, () => {
    console.log('listening on the port', port)
})

const io = socket(server)

io.on('connection', socket => {
    console.log('a user connected')

    socket.on('disconnect', reason => {
        console.log('user disconnected')
    })

    socket.on('room', data => {
        console.log('room join')
        console.log(data)
        socket.join(data.room)
    })

    socket.on('leave room', data => {
        console.log('leaving room')
        console.log(data)
        socket.leave(data.room)
    })

    socket.on('new message', data => {
        console.log(data.room)
        socket.broadcast
        .to(data.room)
        .emit('recieve message', data)
    })
})