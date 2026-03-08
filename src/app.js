const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");

const cors = require("cors");
const http = require("http");

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);

initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database connected successfully...");

    server.listen(3000, () => {
      console.log("Server successfully running on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database can't be connected....");
  });
