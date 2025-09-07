// 'use client';

// import { useState, useEffect } from 'react';
// import { io, Socket } from 'socket.io-client';
// import Link from 'next/link';
// // import Image from 'next/image';

// type Message = {
//   id: number; 
//   text: string; 
//   sender: 'user' | 'other'; 
//   code?: boolean;
//   createdAt: string;
// };

// // This is important because it prevents us from creating a new connection every time the component re-renders.
// let socket: Socket | null = null;


// export default function ChatPage() {
     
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState(''); // State for the text in the input box.
//   const [isAnonymous, setIsAnonymous] = useState(true);
//   const [isConnected, setIsConnected] = useState(false);


//   //This 'useEffect' hook handles our socket connection and its lifecycle.
//    useEffect(() => {
//     // const socketInitializer = async () => {
//       if (!socket) {
//         // await fetch('/api/socket');
//         socket = io('http://localhost:3001');
//       }

//       // socketInitializer();

//       socket.on('connect', () => {
//         setIsConnected(true);
//         console.log('Socket connected successfully!');
//       });

//       //We set this as our initial messages.
//     socket.on('initial-messages', (initialMessages: Message[]) => {
//         setMessages(initialMessages);
//     });


//         socket.on('receive-message', (data: Message) => {
//         // We use `prevMessages` to make sure we don't accidentally erase the old messages.
//         setMessages((prevMessages) => [...prevMessages, data]);
//       });
    

//     // socketInitializer();

//      return () => {
//       if (socket) {
//         socket.off('receive-message');
//         socket.off('initial-messages'); // FIX: We also need to turn off this new listener.
//         socket.disconnect();
//         socket = null;
//       }
//     };
//   }, []);


    
      
//    useEffect(() => {
//     const chatContainer = document.getElementById('chat-container');
//     if (chatContainer) {
//       chatContainer.scrollTop = chatContainer.scrollHeight;
//     }
//   }, [messages]);

//    const handleSendMessage = () => {
//     // If the input is empty, we don't send anything.
//     if (input.trim() === '') return;

//     if (!isConnected) {
//         alert("Not connected to the chat yet. Please wait a moment.");
//         return;
//     }

//     // FIX: We are now sending a simpler message object to the server.
//     // The server will handle creating the ID and timestamp for us.
//     const newMessage = {
//       text: input,
//       sender: isAnonymous ? 'user' : 'other',
//     };

    
//    if (socket) {
//       // We are sending the message to the server.
//       socket.emit('send-message', newMessage);

//       // This is the new line. We immediately add the sent message to our local list.
//       // This makes the message appear instantly in your chat.
//       // setMessages((prevMessages) => [...prevMessages, newMessage]);
//     }
//     // We clear the input box.
//     setInput('');
//   };

//   // This function listens for the 'Enter' key press in the input box to send a message.
//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   if (!isConnected) {
//     return (
//         <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
//             <h1 className="text-3xl font-bold">Connecting...</h1>
//         </div>
//     );
//   }

//   return (
//      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      
//       {/* This is the chat 'card' or window, which holds all the UI elements. */}
//       <div className="w-full max-w-lg h-[80vh] md:h-[70vh] bg-gray-800 rounded-3xl shadow-2xl flex flex-col">

//         {/* This is the header section. */}
//         <div className="flex items-center justify-between p-6 bg-gray-700 rounded-t-3xl">
         
//           {/* This Link component creates a 'back' button to return to the homepage. */}
          
//           <Link href="/" className="flex items-center space-x-2">
           
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            
//             </svg>
            
//             <span className="text-xl font-bold">ChatHub - messages</span>
          
//           </Link>
          
//           {/* A placeholder button for the dark mode toggle. */}
//           <button onClick={() => { /* Dark mode toggle functionality here */ }} className="focus:outline-none">
            
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 20.25a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5zM12 4.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM12 17.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM15.93 5.303a.75.75 0 01.53-.22h.001a.75.75 0 01.53.22l1.06 1.06a.75.75 0 010 1.06l-.001-.001a.75.75 0 01-.53.22h-.001a.75.75 0 01-.53-.22l-1.06-1.06a.75.75 0 010-1.06zM5.303 8.07a.75.75 0 01-.53-.22l-1.06-1.06a.75.75 0 010-1.06l.001-.001a.75.75 0 01.53-.22h.001a.75.75 0 01.53.22l1.06 1.06a.75.75 0 010 1.06zM15.93 18.697a.75.75 0 01.53-.22h.001a.75.75 0 01.53.22l1.06 1.06a.75.75 0 010 1.06l-.001-.001a.75.75 0 01-.53.22h-.001a.75.75 0 01-.53-.22l-1.06-1.06a.75.75 0 010-1.06zM5.303 21.467a.75.75 0 01-.53-.22l-1.06-1.06a.75.75 0 010-1.06l.001-.001a.75.75 0 01.53-.22h.001a.75.75 0 01.53.22l1.06 1.06a.75.75 0 010 1.06zM2.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM17.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM12 4.5v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0zM12 17.25v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0z" />
//             </svg>
         
//           </button>
        
//         </div>

//         {/* This is the main message section. It is a scrollable container. */}
//         <div id="chat-container" className="flex-1 overflow-y-auto p-4 space-y-4">
         
//           {/* We use the .map() method to loop through our 'messages' state and create a message bubble for each one. */}
//           {messages.map(message => (
           
//            // This container aligns the message to the left or right, depending on the sender.
//             <div
//               key={message.id} // The 'key' is a unique ID that React uses to keep track of each item in a list. It is very important for performance.
//               className={`flex items-start ${message.sender === 'user' ? 'justify-end' : ''}`}
//             >
//               {/* This is the message bubble itself. */}
//               <div
//                 className={`flex flex-col max-w-[80%] p-4 rounded-xl shadow-md ${
//                   message.sender === 'user'
//                     ? 'bg-blue-600 text-white rounded-br-none' // Styles for the user's message.
//                     : 'bg-gray-700 text-white rounded-bl-none' // Styles for the other person's message.
//                 }`}
//               >
//                 {/* We use a ternary operator to check if the message is a code block. */}
//                 {message.code ? (
                 
//                  // If it's a code block, we render it inside a <pre> tag.
//                   <pre className="bg-gray-900 rounded-lg p-2 overflow-x-auto text-sm">
//                     <code>{message.text}</code>
//                   </pre>
//                 ) : (
                 
//                   // Otherwise, we render it as a standard paragraph.
//                   <p>{message.text}</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* This is the input section at the bottom of the page. */}
//         <div className="p-4 bg-gray-700 rounded-b-3xl flex items-center">
//           {/* This is the Anonymous toggle switch. We use a hidden checkbox and a label to create the custom UI. */}
//           <label className="relative flex items-center mr-4">
//             {/* The 'sr-only' class hides the checkbox from the screen but keeps it for screen readers. */}
//             <input
//               type="checkbox"
//               className="sr-only peer"
//               checked={isAnonymous}
//               onChange={() => setIsAnonymous(!isAnonymous)}
//             />
//             {/* These divs and spans are what create the visual representation of the toggle switch. */}
//             <div className="w-10 h-6 bg-gray-600 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
//             <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
//             <span className="ml-2 text-sm">Anonymous</span>
//           </label>
//           {/* This is the message input box. */}
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="flex-1 p-3 rounded-full bg-gray-600 border-none text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {/* This is the 'Send' button. It calls the 'handleSendMessage' function when clicked. */}
//           <button
//             onClick={handleSendMessage}
//             className="ml-2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client';

// import { useState, useEffect } from 'react';
// import { io, Socket } from 'socket.io-client';
// import Link from 'next/link';

// type Message = {
//   id: number;
//   text: string;
//   sender: 'user' | 'other';
//   code?: boolean;
// };

// let socket: Socket | null = null;

// export default function ChatPage() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [isAnonymous, setIsAnonymous] = useState(true);
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     if (!socket) {
//       socket = io('http://localhost:3001');
//     }

//     socket.on('connect', () => {
//       setIsConnected(true);
//       console.log('Socket connected successfully!');
//     });

//     socket.on('receive-message', (data: Message) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });
    
//     return () => {
//       if (socket) {
//         socket.off('receive-message');
//         socket.disconnect();
//         socket = null;
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const chatContainer = document.getElementById('chat-container');
//     if (chatContainer) {
//       chatContainer.scrollTop = chatContainer.scrollHeight;
//     }
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (input.trim() === '') return;

//     if (!isConnected) {
//         alert("Not connected to the chat yet. Please wait a moment.");
//         return;
//     }

//     const newMessage = {
//       text: input,
//       sender: isAnonymous ? 'user' : 'other',
//       code: false,
//     };

//     if (socket) {
//       socket.emit('send-message', newMessage);
//       // FIX: We are no longer adding the message to the local state.
//       // We are waiting for the server to broadcast it back to us.
//     }
    
//     setInput('');
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   if (!isConnected) {
//     return (
//         <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
//             <h1 className="text-3xl font-bold">Connecting...</h1>
//         </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
//       <div className="w-full max-w-lg h-[80vh] md:h-[70vh] bg-gray-800 rounded-3xl shadow-2xl flex flex-col">
//         <div className="flex items-center justify-between p-6 bg-gray-700 rounded-t-3xl">
//           <Link href="/" className="flex items-center space-x-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             <span className="text-xl font-bold">⟡-Oroom</span>
//           </Link>
//           <button onClick={() => { /* Dark mode toggle functionality here */ }} className="focus:outline-none">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 20.25a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5zM12 4.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM12 17.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM15.93 5.303a.75.75 0 01.53-.22h.001a.75.75 0 01.53.22l1.06 1.06a.75.75 0 010 1.06l-.001-.001a.75.75 0 01-.53.22h-.001a.75.75 0 01-.53-.22l-1.06-1.06a.75.75 0 010-1.06zM5.303 8.07a.75.75 0 01-.53-.22l-1.06-1.06a.75.75 0 010-1.06l.001-.001a.75.75 0 01.53-.22h.001a.75.75 0 01.53.22l1.06 1.06a.75.75 0 010 1.06zM15.93 18.697a.75.75 0 01.53-.22h.001a.75.75 0 01.53.22l1.06 1.06a.75.75 0 010 1.06l-.001-.001a.75.75 0 01-.53.22h-.001a.75.75 0 01-.53-.22l-1.06-1.06a.75.75 0 010-1.06zM5.303 21.467a.75.75 0 01-.53-.22l-1.06-1.06a.75.75 0 010-1.06l.001-.001a.75.75 0 01.53-.22h.001a.75.75 0 01.53.22l1.06 1.06a.75.75 0 010 1.06zM2.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM17.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM12 4.5v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0zM12 17.25v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0z" />
//             </svg>
//           </button>
//         </div>
//         <div id="chat-container" className="flex-1 overflow-y-auto p-4 space-y-4">
//           {messages.map(message => (
//             <div
//               key={message.id}
//               className={`flex items-start ${message.sender === 'user' ? 'justify-end' : ''}`}
//             >
//               <div
//                 className={`flex flex-col max-w-[80%] p-4 rounded-xl shadow-md ${
//                   message.sender === 'user'
//                     ? 'bg-blue-600 text-white rounded-br-none'
//                     : 'bg-gray-700 text-white rounded-bl-none'
//                 }`}
//               >
//                 {message.code ? (
//                   <pre className="bg-gray-900 rounded-lg p-2 overflow-x-auto text-sm">
//                     <code>{message.text}</code>
//                   </pre>
//                 ) : (
//                   <p>{message.text}</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="p-4 bg-gray-700 rounded-b-3xl flex items-center">
//           <label className="relative flex items-center mr-4">
//             <input
//               type="checkbox"
//               className="sr-only peer"
//               checked={isAnonymous}
//               onChange={() => setIsAnonymous(!isAnonymous)}
//             />
//             <div className="w-10 h-6 bg-gray-600 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
//             <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
//             <span className="ml-2 text-sm">Anonymous</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="flex-1 p-3 rounded-full bg-gray-600 border-none text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleSendMessage}
//             className="ml-2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import Link from 'next/link';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'other';
  code?: boolean;
};

let socket: Socket | null = null;

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socket) {
      socket = io('http://localhost:3001',{ path: '/api/socket' });
    }

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected successfully!');
    });

    socket.on('receive-message', (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    
    return () => {
      if (socket) {
        socket.off('receive-message');
        socket.disconnect();
        socket = null;
      }
    };
  }, []);

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    if (!isConnected) {
        alert("Not connected to the chat yet. Please wait a moment.");
        return;
    }

    const newMessage = {
      text: input,
      sender: isAnonymous ? 'user' : 'other',
      code: false,
    };

    if (socket) {
      socket.emit('send-message', newMessage);
      // setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
    
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isConnected) {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <h1 className="text-3xl font-bold">Connecting...</h1>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg h-[80vh] md:h-[70vh] bg-gray-800 rounded-3xl shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 bg-gray-700 rounded-t-3xl">
          <Link href="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-xl font-bold">⟡-Oroom</span>
          </Link>
          <button onClick={() => { /* Dark mode toggle functionality here */ }} className="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 20.25a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5zM12 4.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM12 17.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM15.93 5.303a.75.75 0 01.53-.22h.001a.75.75 0 01.53.22l1.06 1.06a.75.75 0 010 1.06l-.001-.001a.75.75 0 01-.53.22h-.001a.75.75 0 01-.53-.22l-1.06-1.06a.75.75 0 010-1.06zM5.303 8.07a.75.75 0 01-.53-.22l-1.06-1.06a.75.75 0 010-1.06l.001-.001a.75.75 0 01.53-.22h.001a.75.75 0 01.53.22l1.06 1.06a.75.75 0 010 1.06zM15.93 18.697a.75.75 0 01.53-.22h.001a.75.75 0 01.53.22l1.06 1.06a.75.75 0 010 1.06l-.001-.001a.75.75 0 01-.53.22h-.001a.75.75 0 01-.53-.22l-1.06-1.06a.75.75 0 010-1.06zM5.303 21.467a.75.75 0 01-.53-.22l-1.06-1.06a.75.75 0 010-1.06l.001-.001a.75.75 0 01.53-.22h.001a.75.75 0 01.53.22l1.06 1.06a.75.75 0 010 1.06zM2.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM17.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM12 4.5v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0zM12 17.25v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0z" />
            </svg>
          </button>
        </div>
        <div id="chat-container" className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex items-start ${message.sender === 'user' ? 'justify-end' : ''}`}
            >
              <div
                className={`flex flex-col max-w-[80%] p-4 rounded-xl shadow-md ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-700 text-white rounded-bl-none'
                }`}
              >
                {message.code ? (
                  <pre className="bg-gray-900 rounded-lg p-2 overflow-x-auto text-sm">
                    <code>{message.text}</code>
                  </pre>
                ) : (
                  <p>{message.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-700 rounded-b-3xl flex items-center">
          <label className="relative flex items-center mr-4">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
            />
            <div className="w-10 h-6 bg-gray-600 rounded-full peer-checked:bg-blue-600 transition-colors"></div>
            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
            <span className="ml-2 text-sm">Anonymous</span>
          </label>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-3 rounded-full bg-gray-600 border-none text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}