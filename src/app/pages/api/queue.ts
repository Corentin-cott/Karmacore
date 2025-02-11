import { Server as NetServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: NetServer & { io?: SocketIOServer };
  };
};

// Global queue stored in memory
type QueueEntry = { id: string; randomName: string; nickname: string };
let queue: QueueEntry[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (!res.socket.server.io) {
    console.log("Starting Socket.IO server...");
    const io = new SocketIOServer(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);
      socket.emit("queueUpdated", queue); // Send the current queue

      socket.on("joinQueue", (nickname: string) => {
        const randomName = `User#${Math.floor(1000 + Math.random() * 9000)}`;
        const newEntry = { id: socket.id, randomName, nickname };

        queue.push(newEntry);
        io.emit("queueUpdated", queue);
      });

      socket.on("removeFromQueue", (id: string) => {
        queue = queue.filter((entry) => entry.id !== id);
        io.emit("queueUpdated", queue);
      });

      socket.on("moveUp", (id: string) => {
        const index = queue.findIndex((entry) => entry.id === id);
        if (index > 0) {
          [queue[index], queue[index - 1]] = [queue[index - 1], queue[index]];
          io.emit("queueUpdated", queue);
        }
      });

      socket.on("moveDown", (id: string) => {
        const index = queue.findIndex((entry) => entry.id === id);
        if (index < queue.length - 1) {
          [queue[index], queue[index + 1]] = [queue[index + 1], queue[index]];
          io.emit("queueUpdated", queue);
        }
      });

      socket.on("disconnect", () => {
        queue = queue.filter((entry) => entry.id !== socket.id);
        io.emit("queueUpdated", queue);
      });
    });
  }

  res.end();
}
