import { Server } from "socket.io";
import { createServer } from "http";
const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Autoriser toutes les origines (à restreindre en prod)
  },
});

io.on("connection", (socket) => {
  console.log("✅ Client connecté :", socket.id);

  socket.on("message", (msg) => {
    io.emit("message", msg); // Broadcast
  });

  socket.on("disconnect", () => {
    console.log("❌ Client déconnecté :", socket.id);
  });
});

server.listen(3001, () => console.log("🚀 Serveur WebSocket sur http://localhost:3001"));
