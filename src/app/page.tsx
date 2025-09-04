import Link from 'next/link';
// import Image from 'next/image';
// import SignInButton from '../components/SignInButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
        Ghostdrop
      </h1>
      <p className="mt-4 text-center text-lg md:text-xl">
        Connect anonymously. Chat freely.
      </p>
       <Link
        href="/chat"
        className="mt-8 rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-600"
      >
        Start Chat
      </Link>
    </main>
  );
}


// import Link from 'next/link';
// import SignInButton from '../components/SignInButton';

// export default function Home() {
//   return (
//     <div className="bg-gray-900 min-h-screen p-8 text-white">
//       {/* Header */}
//       <header className="flex justify-between items-center py-4">
//         <div className="flex items-center space-x-2">
//           <span className="text-2xl font-bold">Open Room</span>
//         </div>
//         <div className="flex items-center space-x-4">
//           <a href="https://github.com/Arjit8807/Ghostdrop" target="_blank" rel="noopener noreferrer">
//             <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//               <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.417 2.865 8.163 6.83 9.542.5.092.682-.218.682-.483 0-.237-.008-.88.004-1.722.065-.29.232-.619.46-.949-1.986.43-2.413-.95-2.413-.95-.326-.827-.798-1.04-.972-1.11-.659-.449-.05-.439.039-.439.593.041.905.602 1.03.859.61 1.026 1.597.728 2.016.557.062-.43.238-.727.436-.893-1.523-.173-3.12-1.282-3.12-3.414 0-.756.269-1.378.71-1.869-.071-.173-.308-.888.069-1.849 0 0 .579-.186 1.895.714A6.12 6.12 0 0112 7.669c.582 0 1.163.078 1.713.23.639-.902 1.22-.714 1.898-.714.377.961.14 1.676.069 1.849.44.491.708 1.113.708 1.869 0 2.139-1.597 3.24-3.12 3.414.232.2.464.58.464 1.17 0 .848-.008 1.534-.008 1.742 0 .265.18.577.689.488 3.968-1.379 6.83-5.125 6.83-9.542C22 6.484 17.523 2 12 2z" clipRule="evenodd" />
//             </svg>
//           </a>
//           <SignInButton />
//         </div>
//       </header>

//       {/* Main content area with auto margins for centering on large screens */}
//       <main className="container mx-auto p-4">
//         {/* Featured Room Card */}
//         <div className="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-3xl p-8 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12 shadow-xl">
//           <div className="flex-1">
//             <h2 className="text-4xl font-bold mb-4">Featured Room</h2>
//             <p className="text-lg mb-6">Explore our most active space and meet people already chatting. Jump in or pick another room below.</p>
//             <Link href="#" className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-full font-semibold transition-colors duration-300 hover:bg-gray-200">
//               Explore Now
//               <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
//               </svg>
//             </Link>
//           </div>
//           <div className="w-full md:w-1/2 flex justify-center">
//             {/* Placeholder for the image from the design */}
//           </div>
//         </div>

//         {/* Discover Rooms Section */}
//         <div className="mt-12">
//           <h2 className="text-3xl font-bold mb-6">Discover Rooms</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* Room Card 1 */}
//             <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
//               <div className="relative w-full h-48">
//                 {/* Placeholder for images */}
//               </div>
//               <div className="p-4">
//                 <h3 className="text-xl font-bold">Fun Chat</h3>
//               </div>
//             </div>

//             {/* Room Card 2 */}
//             <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
//               <div className="relative w-full h-48">
//                 {/* Placeholder for images */}
//               </div>
//               <div className="p-4">
//                 <h3 className="text-xl font-bold">Study</h3>
//               </div>
//             </div>

//             {/* Room Card 3 */}
//             <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
//               <div className="relative w-full h-48">
//                 {/* Placeholder for images */}
//               </div>
//               <div className="p-4">
//                 <h3 className="text-xl font-bold">Development</h3>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }