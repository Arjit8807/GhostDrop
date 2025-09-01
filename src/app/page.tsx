//git setup
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
        Ghostdrop
      </h1>
      <p className="mt-4 text-center text-lg md:text-xl">
        Connect anonymously. Chat freely.
      </p>
      <a
        href="#"
        className="mt-8 rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-600"
      >
        Start Chat
      </a>
    </main>
  );
}
