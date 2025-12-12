import { Socket } from 'dgram';
import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer)
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

let socketsConnected = new Set();


io.on('connection',onConnected);

function onConnected(socket){
    socketsConnected.add(socket.id);


    io.emit('clients-total', socketsConnected.size);


    socket.on('disconnect', ()=>{
        socketsConnected.delete(socket.id);
        io.emit('clients-total', socketsConnected.size);
    })

    socket.on('message', (data)=>{
        socket.broadcast.emit('chat-msg', data);
    });

    socket.on('feedback', (data)=>{
        socket.broadcast.emit('feedback', data);
    });
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

httpServer.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
});
