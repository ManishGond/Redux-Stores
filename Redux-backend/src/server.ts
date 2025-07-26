import { createServer } from "http";
import app from "./app";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

export {io}

server.listen(PORT, () => {
  console.log(`🚀 Server is running on PORT ${PORT}`);
});