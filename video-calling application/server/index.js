require("dotenv").config();
const express = require("express")
const cors = require("cors")
const http = require("http")
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 5000

app.use(cors())

const io = require("socket.io")(server,{
    cors:{
        origin:"*"
    }
})

const socketToRooms = new Map()

io.on("connection",(socket)=>{
    console.log("Connected with client")
    socket.on("join_room",(room)=>{
        socket.join(room)
        socketToRooms.set(socket.id,room)
        socket.to(room).emit("new_user",socket.id)
        console.log("joined room "+room)
    })
    socket.on("leave_room",(room)=>{
        socket.leave(room)
        socket.to(socketToRooms.get(socket.id)).emit("user_left",socket.id)
        socketToRooms.delete(socket.id)
    })
    socket.on("disconnect", () => {
        console.log(socket.id + " left");     
        socket.to(socketToRooms.get(socket.id)).emit("user_left",socket.id)
        socketToRooms.delete(socket.id)
    });
})

server.listen(PORT,()=>console.log(`Server started at port ${PORT}`))