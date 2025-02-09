"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Chat() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<{ username: string; text: string }[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("assignUsername", (assignedUsername: string) => {
      setUsername(assignedUsername);
    });

    socket.on("message", (msg: { username: string; text: string }) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("assignUsername");
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
    <div
      id="chat-component"
      className="h-full flex flex-col rounded-lg border border-gray-700 overflow-hidden"
    >
      <div
        id="chat-messages"
        className="flex-1 p-2 overflow-y-auto bg-gray-800"
      >
        {messages.map((msg, i) => (
          <div key={i} className="p-1 break-words">
            <strong>{msg.username}</strong>:<br />
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div id="chat-input" className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 p-2 border-t border-gray-600 bg-gray-900 text-white"
          placeholder="Type your message here..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}
