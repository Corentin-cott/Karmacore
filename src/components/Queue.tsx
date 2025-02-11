"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"], // Allow fallback
});

export default function Queue() {
  const [queue, setQueue] = useState([]);
  const [nickname, setNickname] = useState("");
  const [randomName, setRandomName] = useState("");

  useEffect(() => {
    socket.on("queueUpdated", (newQueue) => setQueue(newQueue));
    socket.on("assignUsername", (username) => setRandomName(username));

    return () => {
      socket.off("queueUpdated");
      socket.off("assignUsername");
    };
  }, []);

  const joinQueue = () => {
    if (nickname.trim()) {
      socket.emit("joinQueue", nickname);
      setNickname(""); // Clear input
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold">Queue System</h2>
      <p>Your random name: <span className="font-bold">{randomName}</span></p>
      <input
        type="text"
        placeholder="Enter your nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="p-2 border rounded text-black"
      />
      <button onClick={joinQueue} className="bg-blue-500 p-2 rounded ml-2">
        Join Queue
      </button>

      <ul className="mt-4">
        {queue.map(({ id, randomName, nickname }) => (
          <li key={id} className="p-2 border-b">
            {randomName} ({nickname})
          </li>
        ))}
      </ul>
    </div>
  );
}
