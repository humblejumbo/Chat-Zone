const express = require('express')
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO.listen(server);

const port = process.env.PORT || 3000;

app.get('/',(req,res)=>
{
    res.send('hello');

});

io.sockets.on('connection', (socket) => {
    console.log('user connected');

socket.on('new-message',(data)=>
{
    console.log(data.user + " : " + data.message);
    io.in(data.room).emit("message sent",{user:data.user,message:data.message});
})

    socket.on("join",(data)=>
    {
        socket.join(data.room);
        console.log(data.user+" has joined the room "+data.room);
        socket.broadcast.to(data.room).emit("new user joined",{user:data.user,message:'has joined this room.'});
    })

    socket.on("leave", (data) => {
        
        console.log(data.user + " has left the room " + data.room);
        socket.broadcast.to(data.room).emit("user left", { user: data.user, message: 'has left this room.' });
        socket.leave(data.room);
    })
});


server.listen(port, () => {
    console.log('Server started!!');
});