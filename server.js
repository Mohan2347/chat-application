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
