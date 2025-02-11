// pages/index.js
import Head from "next/head";
import ChatComponent from "@/components/Chat";
import StreamEmbed from "@/components/StreamEmbed";
import Queue from "@/components/Queue";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hideonbushbro website</title>
        <meta name="description" content="Interactive system with chat and queue management" />
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Hideonbushbro</h1>
          <div className="flex gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Discord</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Twitch</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">YouTube</button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Patreon</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded">Profile</button>
          </div>
        </header>

        {/* Main Content */}
        <main id="main-content" className="flex-1 p-4 grid grid-cols-3 gap-4">
          {/* Left Column */}
          <div id="left-column" className="col-span-2 aspect-w-16 aspect-h-9">
            <StreamEmbed url="https://www.youtube.com/watch?v=rviiz5hFNbA" />
          </div>

          {/* Chat Section */}
          <div id="chat-column" className="col-span-1 aspect-w-16 aspect-h-9">
            <ChatComponent />
          </div>

          {/* Queue Section */}
          <div id="queue-column" className="col-span-3">
            <Queue />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 p-4">
          <div className="mb-4">
            <h2 className="text-lg font-bold">Stuff here soon</h2>
            <p>stuff here soon now</p>
          </div>
        </footer>
      </div>
    </>
  );
}
