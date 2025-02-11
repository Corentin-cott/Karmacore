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
    cors: { origin: "*" },
});
var queue = new Map();
io.on("connection", function (socket) {
    var username = generateRandomUsername();
    console.log("\u2705 Client connected: ".concat(socket.id, ", Username: ").concat(username));
    socket.emit("assignUsername", username);
    socket.on("joinQueue", function (nickname) {
        queue.set(socket.id, { id: socket.id, randomName: username, nickname: nickname });
        io.emit("queueUpdated", Array.from(queue.values()));
    });
    socket.on("removeFromQueue", function () {
        queue.delete(socket.id);
        io.emit("queueUpdated", Array.from(queue.values()));
    });
    socket.on("disconnect", function () {
        queue.delete(socket.id);
        io.emit("queueUpdated", Array.from(queue.values()));
        console.log("\u274C Client disconnected: ".concat(socket.id));
    });
});
server.listen(3001, function () { return console.log("🚀 WebSocket server running on http://localhost:3001"); });
function generateRandomUsername() {
    var names = ["Michael", "Trevor", "Franklin", "Lamar"];
    return names[Math.floor(Math.random() * names.length)] + Math.floor(1000 + Math.random() * 9000);
}
