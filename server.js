// first of all server will run on 8000
// first of all we wil create inputoutput object for socket
// socket io=when connecting multiple system at one place
// provide port n0-8000
// crrate serevr --listen krdiga 8000 port pr
const io = require("socket.io")(8000,{
    // cors policy--when we switch from one port to another
    cors:{
        // * -means all 
        origin:'*',
    }
})
// we crete list anyone joined chat  he will be added in list
const user = {}
// if someone one event will crated
// server will three message 1.new-user-joined 2."receive" "3."user-left",
// socket perform 3 evts will be created 

// on fuction-- listen the  socket
// after that socket will be created
// afret the connection we be craeted
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        // 
        user[socket.id]=name
        // braodcast means everyone will receive except the one
    //    new user joined
        socket.broadcast.emit('user-joined',name)
    })
    // braosdcast meggae is done by6 him
    socket.on("send",message=>{
        socket.broadcast.emit("receive",{"message":message,name:user[socket.id]})
    })
    // all user will know he has left
    // braodcast will be done
    socket.on("disconnect",message=>{
        socket.broadcast.emit("user-left",user[socket.id])
        delete user[socket.id]
    })
})