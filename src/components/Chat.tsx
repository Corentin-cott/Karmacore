"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Chat() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<{ username: string; text: string }[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Assign username on connection
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
    <div className="p-4 max-w-md mx-auto">
      <div className="border p-2 h-[42rem] w-[28rem] overflow-y-auto overflow-x-hidden">
        {messages.map((msg, i) => (
          <div key={i} className="p-1 break-words">
            <strong>{msg.username}</strong>:<br />
            <p className="break-words">{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="flex w-[28rem] mt-2">
        <input
          type="text"
          value={message}
          style={{ color: "#4a4a4a" }}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 p-2 border rounded-l"
          placeholder="Type your message here..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Send
        </button>
      </div>
      <button
        onClick={() => {
          // Nothing to do here for now
        }}
        className="w-[28rem] bg-green-500 text-white p-2 mt-2 rounded"
      >
        Join Queue
      </button>
    </div>
  );
  
}  