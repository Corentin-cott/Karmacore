import { Server } from "socket.io";
import { createServer } from "http";
const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Autorise every origin to connect (TODO: restrict later)
  },
});

io.on("connection", (socket) => {
  const username = generateRandomUsername(); // Generate a username
  console.log(`✅ Client connected: ${socket.id}, Username: ${username}`);

  // Send the username to the client
  socket.emit("assignUsername", username);

  // Handle incoming messages
  socket.on("message", (msg) => {
    io.emit("message", { username, text: msg });
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => console.log("🚀 Serveur WebSocket sur http://localhost:3001"));

function generateRandomUsername() {
  const nouns = ["Michael", "Trevor", "Franklin", "Lamar", "Jimmy", "Amanda", "Tracey", "Ron", "Wade", "Lester", "Dave", "Steve", "Devin", "Solomon", "Molly", "Tanisha", "Lazlow", "Simeon", "Stretch", "Floyd", "Chop", "Fabien", "Dr. Friedlander", "Mrs. Philips"]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit number, making sure the username is unique
  return `${randomNoun}${randomNumber}`;
}
