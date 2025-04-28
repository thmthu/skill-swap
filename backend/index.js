import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { createClient } from "redis";
import {
  authRouters,
  userRouters,
  connectionRouters,
  chatRouters,
} from "./routes/routes.js";
import cors from "cors";
import connectMongo from "./config/mongo.js";
import redisClient from "./config/redis.js";
import { createServer } from "http"; 
import { Server } from "socket.io"; 
import initSocket from "./socket/index.js";
connectMongo();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Nếu cần gửi cookie
}));

// redisClient.connect();

// app.use('/api', authRouters, userRouters, connectionRouters);
app.use("/api/chat", chatRouters);
app.use("/api/auth", authRouters);
app.use("/api/users", userRouters);
app.use("/api/connections", connectionRouters);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

initSocket(io);

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
