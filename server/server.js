import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import { Server }
from "socket.io";

import connectDB
from "./config/db.js";

import authRoutes
from "./routes/authRoutes.js";

import discussionRoutes
from "./routes/discussionRoutes.js";

import commentRoutes
from "./routes/commentRoutes.js";

dotenv.config();

connectDB();

const app =
  express();

const server =
  http.createServer(app);

const io =
  new Server(server, {
    cors: {
      origin:
        "http://localhost:5173",
      methods: [
        "GET",
        "POST",
      ],
    },
  });

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://community-discussion-forum-realtime.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/discussions",
  discussionRoutes
);

app.use(
  "/api/comments",
  commentRoutes
);

// Socket.IO
io.on(
  "connection",
  (socket) => {

    console.log(
      "User Connected:",
      socket.id
    );

    // Join discussion room
    socket.on(
      "joinDiscussion",
      (
        discussionId
      ) => {

        socket.join(
          discussionId
        );

        console.log(
          `Joined room: ${discussionId}`
        );
      }
    );

    // Send message
    socket.on(
      "sendMessage",
      (
        messageData
      ) => {

        io.to(
          messageData.discussionId
        ).emit(
          "receiveMessage",
          messageData
        );
      }
    );

    socket.on(
      "disconnect",
      () => {

        console.log(
          "User disconnected:",
          socket.id
        );
      }
    );
  }
);

// Test Route
app.get(
  "/",
  (
    req,
    res
  ) => {
    res.send(
      "Community Forum Backend Running 🚀"
    );
  }
);

const PORT =
  process.env.PORT || 5000;

server.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );
  }
);