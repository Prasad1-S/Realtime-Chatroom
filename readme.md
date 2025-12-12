📚 Basic Realtime Chat App (Node + Socket.io)

A simple real-time chat application built using Node.js, Express, and Socket.io.

Installation
1. Initialize project
npm init -y

2. Install dependencies
npm i express socket.io

3. Run the server
node server.js


Open the browser at:

http://localhost:3000

How It Works

Express creates a basic web server.

Socket.io enables real-time communication between clients and server.

When a user sends a message, the server broadcasts it to all connected users.

When a user connects or disconnects, events are triggered.

Basic Flow

Client connects → io.on("connection")

User sends message → socket.emit("message")

Server broadcasts message → io.emit("message")

Client receives message → socket.on("message")
