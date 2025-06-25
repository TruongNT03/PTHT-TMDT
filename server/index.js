import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

import UserRoute from "./routes/User.js";
import AddressRoute from "./routes/Address.js";
import SectionRoute from "./routes/Section.js";
import CategoryRoute from "./routes/Category.js";
import ProductRoute from "./routes/Product.js";
import CartRouter from "./routes/Cart.js";
import OrderRoute from "./routes/Order.js";
import DashboardRoute from "./routes/Dashboard.js";
import ChatRoute from "./routes/Chat.js";

import { googleStrategy, facebookStrategy } from "./passport.js";
import db from "./models/index.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:3000", // React client
    credentials: true, // Cho phép gửi cookie
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
passport.use(googleStrategy);
passport.use(facebookStrategy);
app.use("/images", express.static("images"));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use("/api/v1/auth", UserRoute);
app.use("/api/v1/address", AddressRoute);
app.use("/api/v1/section", SectionRoute);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/product", ProductRoute);
app.use("/api/v1/cart", CartRouter);
app.use("/api/v1/order", OrderRoute);
app.use("/api/v1/dashboard", DashboardRoute);
app.use("/api/v1/chat", ChatRoute);

const online_users = new Map();

io.on("connection", (socket) => {
  console.log("Hello");

  const user_id = socket.handshake.auth.user_id;
  online_users.set(user_id, socket.id);

  console.log(online_users);

  socket.on("chat message", async ({ from, to, msg }) => {
    const toSocketId = online_users.get(to);

    const chat_room = await db.chat_rooms.findOrCreate({
      where: {
        user_one: from || to,
        user_two: to || from,
      },
      defaults: {
        from,
        to,
      },
    });

    const message = await db.chat_messages.create({
      chat_room_id: chat_room[0].id,
      msg: msg,
      from: from,
      to: to,
    });

    if (toSocketId) {
      io.to(toSocketId).emit("chat message", { from, to, msg });
    }
  });

  socket.on("disconnect", () => {
    online_users.delete(user_id);
  });
});

app.get("/", (req, res) => {
  res.status(200).json("Hello");
});

server.listen(PORT, () => {
  console.log(`Server listen at PORT: ${PORT}`);
});
