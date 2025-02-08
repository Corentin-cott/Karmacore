"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
var server = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*", // Autorise every origin to connect (TODO: restrict later)
    },
});
io.on("connection", function (socket) {
    var username = generateRandomUsername(); // Generate a username
    console.log("\u2705 Client connected: ".concat(socket.id, ", Username: ").concat(username));
    // Send the username to the client
    socket.emit("assignUsername", username);
    // Handle incoming messages
    socket.on("message", function (msg) {
        io.emit("message", { username: username, text: msg });
    });
    socket.on("disconnect", function () {
        console.log("\u274C Client disconnected: ".concat(socket.id));
    });
});
server.listen(3001, function () { return console.log("🚀 Serveur WebSocket sur http://localhost:3001"); });
function generateRandomUsername() {
    var nouns = ["Michael", "Trevor", "Franklin", "Lamar", "Jimmy", "Amanda", "Tracey", "Ron", "Wade", "Lester", "Dave", "Steve", "Devin", "Solomon", "Molly", "Tanisha", "Lazlow", "Simeon", "Stretch", "Floyd", "Chop", "Fabien", "Dr. Friedlander", "Mrs. Philips"];
    var randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    var randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit number, making sure the username is unique
    return "".concat(randomNoun).concat(randomNumber);
}
