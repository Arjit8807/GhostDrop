import { Server } from 'socket.io';

export async function GET() {
  if (global.io) {
    return new Response(JSON.stringify({ success: true, message: 'Socket.io server already running' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const io = new Server({
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('send-message', (message) => {
      io.emit('receive-message', message);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  global.io = io;

  return new Response(JSON.stringify({ success: true, message: 'Socket.io server started' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}