"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // Utiliser le serveur externe

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="border p-2 h-64 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="">{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border rounded mt-2"
        placeholder="Tape ton message..."
      />
      <button onClick={sendMessage} className="w-full bg-blue-500 text-white p-2 mt-2 rounded">
        Envoyer
      </button>
    </div>
  );
}
