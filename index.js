
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set public directory
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('join', ({ name }) => {
    io.emit('team', { name });
  });

  // Listen for client message
  socket.on('chatMessage', ({name, msg}) => {
    console.log('received: %s', msg);
    io.emit('message', {name, msg});  
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    console.log('a user disconnected');
    return;
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));