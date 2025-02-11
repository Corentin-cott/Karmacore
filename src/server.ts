import { Server } from "socket.io";
import { createServer } from "http";
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const queue = new Map();

io.on("connection", (socket) => {
  const username = generateRandomUsername();
  console.log(`✅ Client connected: ${socket.id}, Username: ${username}`);

  socket.emit("assignUsername", username);

  socket.on("joinQueue", (nickname) => {
    queue.set(socket.id, { id: socket.id, randomName: username, nickname });
    io.emit("queueUpdated", Array.from(queue.values()));
  });

  socket.on("removeFromQueue", () => {
    queue.delete(socket.id);
    io.emit("queueUpdated", Array.from(queue.values()));
  });

  socket.on("disconnect", () => {
    queue.delete(socket.id);
    io.emit("queueUpdated", Array.from(queue.values()));
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => console.log("🚀 WebSocket server running on http://localhost:3001"));

function generateRandomUsername() {
  const names = ["Michael", "Trevor", "Franklin", "Lamar"];
  return names[Math.floor(Math.random() * names.length)] + Math.floor(1000 + Math.random() * 9000);
}
