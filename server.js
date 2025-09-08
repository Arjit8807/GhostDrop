import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from './src/generated/prisma/index.js';

const prisma = new PrismaClient();
const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', async (socket) => {
  console.log('A user connected:', socket.id);

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

  socket.on('send-message', async (message) => {
    try {
      const savedMessage = await prisma.message.create({
        data: {
          text: message.text,
          sender: message.sender,
        },
      });
      io.emit('receive-message', savedMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Socket.io server listening on port ${PORT}`);
});