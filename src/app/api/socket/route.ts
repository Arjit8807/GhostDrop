// import { Server } from 'socket.io';

// export async function GET() {
//   if (global.io) {
//     return new Response(JSON.stringify({ success: true, message: 'Socket.io server already running' }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }

//   const io = new Server({
//     cors: {
//       origin: '*',
//       methods: ['GET', 'POST'],
//     },
//   });

//   io.on('connection', (socket) => {
//     console.log(`Socket connected: ${socket.id}`);

//     socket.on('send-message', (message) => {
//       io.emit('receive-message', message);
//     });

//     socket.on('disconnect', () => {
//       console.log(`Socket disconnected: ${socket.id}`);
//     });
//   });

//   global.io = io;

//   return new Response(JSON.stringify({ success: true, message: 'Socket.io server started' }), {
//     status: 200,
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

    // import { Server } from 'socket.io';

    // export async function GET() {
    //   if (global.io) {
    //     return new Response(JSON.stringify({ success: true, message: 'Socket.io server already running' }), {
    //       status: 200,
    //       headers: { 'Content-Type': 'application/json' },
    //     });
    //   }

    //   const io = new Server({
    //     cors: {
    //       origin: '*',
    //       methods: ['GET', 'POST'],
    //     },
    //   });

    //   io.on('connection', (socket) => {
    //     console.log(`Socket connected: ${socket.id}`);

    //     socket.on('send-message', (message) => {
    //       io.emit('receive-message', message);
    //     });

    //     socket.on('disconnect', () => {
    //       console.log(`Socket disconnected: ${socket.id}`);
    //     });
    //   });

    //   global.io = io;

    //   return new Response(JSON.stringify({ success: true, message: 'Socket.io server started' }), {
    //     status: 200,
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    // }
    

    import { Server } from 'socket.io';
import { PrismaClient } from '../../../../src/generated/prisma/index.js';

const prisma = new PrismaClient();

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

  io.on('connection', async (socket) => {
    console.log(`Socket connected: ${socket.id}`);

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
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  global.io = io;

  return new Response(JSON.stringify({ success: true, message: 'Socket.io server started' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}