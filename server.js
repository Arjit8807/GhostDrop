

// Lines 1-2: We import the standard Node.js 'http' library and the 'socket.io' library.
// These are the two key tools we need to create our server.
import { createServer } from 'http';
import { Server } from 'socket.io';

import { PrismaClient } from './src/generated/prisma/index.js';

//create a simple HTTP server. This server will be our "door" that our clients can knock on.
const httpServer = createServer();
const prisma = new PrismaClient();



//new instance of our Socket.io server. This is the main engine of our real-time app.
// We pass it our httpServer so it knows which door to listen on.
const io = new Server(httpServer, {
  // Lines 10-13: This is our security guard. We allow connections from all origins for now.
  // We're also telling it that our clients will make 'GET' and 'POST' requests.
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Lines 16-25: This is our core real-time logic. The '.on()' method is an event listener.
// 'connection': This is a built-in event that fires every time a new client connects.
io.on('connection', async (socket) => {
  console.log('A user connected:', socket.id); // We print a message to the terminal to confirm the connection.

 // NEW: Load all messages from the database and send them to the new client.
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
    socket.emit('initial-messages', messages);
  } catch (error) {
    console.error('Error fetching initial messages:', error);
  }

  // 'send-message': This is a custom event we will send from our front-end.
  socket.on('send-message', async (message) => {
     //We are now creating a unique ID on the server before broadcasting.
    try {
      const savedMessage = await prisma.message.create({
        data: {
          text: message.text,
          sender: message.sender,
        },
      });
    // The `io.emit()` function broadcasts a message to every single connected client.
    // This is how everyone sees the message in real time.
    io.emit('receive-message', savedMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // 'disconnect': This built-in event fires when a client leaves the chat.
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Line 28: We tell our server to start listening for connections on port 3001.
// We use a different port than Next.js (which uses 3000) to avoid conflicts.
const PORT = process.env.PORT || 3001; 

httpServer.listen(PORT, () => {
  console.log(`Socket.io server listening on port ${PORT}`);
});
