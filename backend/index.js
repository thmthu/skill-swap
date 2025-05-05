import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import {
  authRouters,
  userRouters,
  connectionRouters,
  chatRouters,
} from "./routes/routes.js";
import connectMongo from "./config/mongo.js";
import redisClient, { connectRedis } from "./config/redis.js";
import session from "express-session";
import passport from "passport";
import setupPassport from "./config/passport.js";
import { SESSION_SECRET, NODE_ENV, PORT, FRONTEND_URL } from "./config/env.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import initSocket from "./socket/index.js";
import initConnectSocket from "./socket/request.js";

const app = express();
const port = PORT || 3000;
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: function(origin, callback) {
      const allowedOrigins = [
        FRONTEND_URL,
        'http://localhost:5173',
        'https://skillswap-117849673427.asia-southeast1.run.app'
      ];
      
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'X-Requested-With']
  })
);

app.options('*', cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(
  session({
    secret: SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

setupPassport();
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).send("Server is healthy");
});

app.use("/api/chat", chatRouters);
app.use("/api/auth", authRouters);
app.use("/api/users", userRouters);
app.use("/api/connections", connectionRouters);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [
      FRONTEND_URL,
      'http://localhost:5173',
      'https://skillswap-117849673427.asia-southeast1.run.app'
    ],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});

initSocket(io);
initConnectSocket(io);

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  
  const connectServices = async () => {
    try {
      // Connect to MongoDB
      const mongoConnected = await connectMongo();
      console.log(`MongoDB connection ${mongoConnected ? 'successful' : 'failed but continuing'}`);
      
      // Connect to Redis if environment variables are set
      const redisConnected = await connectRedis();
      console.log(`Redis connection ${redisConnected ? 'successful' : 'unavailable but continuing'}`);
    } catch (err) {
      console.error("Error connecting to services:", err);
      // Log the error but don't exit
    }
  };
  
  connectServices();
});
