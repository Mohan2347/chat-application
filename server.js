// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// // Create an Express app
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Serve the chat app static files
// app.use(express.static('public'));

// // Handle incoming connections from clients
// io.on('connection', (socket) => {
//   console.log('A user connected');
  
//   // Handle incoming chat messages
//   socket.on('chat message', (data) => {
//     console.log('Message received:', data);
    
//     // Emit the message to all connected clients
//     io.emit('chat message', data);
//   });

//   // Handle user disconnecting
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// // Start the server on port 3000
// server.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });





const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('chat message', (data) => {
    console.log('Message received:', data);
    io.emit('chat message', {
      message: data.message,
      senderId: socket.id
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});









// for db connection replace mongodb 

// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const mongoose = require("mongoose");
// const path = require("path");

// // Initialize app
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // MongoDB Connection
// mongoose.connect("mongodb+srv://<username>:<password>@cluster.mongodb.net/chatDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // Create schema and model
// const messageSchema = new mongoose.Schema({
//   message: String,
//   sender: String,
//   timestamp: { type: Date, default: Date.now }
// });

// const Message = mongoose.model("Message", messageSchema);

// // Serve frontend from /public
// app.use(express.static(path.join(__dirname, "public")));

// // On client connection
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Send old messages
//   Message.find().sort({ timestamp: 1 }).limit(100).then((messages) => {
//     socket.emit("load messages", messages);
//   });

//   // On message from client
//   socket.on("chat message", async (data) => {
//     const newMsg = new Message(data);
//     await newMsg.save();
//     io.emit("chat message", data); // Send to all clients
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
