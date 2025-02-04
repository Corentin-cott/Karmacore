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
        origin: "*", // Autoriser toutes les origines (à restreindre en prod)
    },
});
io.on("connection", function (socket) {
    console.log("✅ Client connecté :", socket.id);
    socket.on("message", function (msg) {
        io.emit("message", msg); // Broadcast
    });
    socket.on("disconnect", function () {
        console.log("❌ Client déconnecté :", socket.id);
    });
});
server.listen(3001, function () { return console.log("🚀 Serveur WebSocket sur http://localhost:3001"); });
