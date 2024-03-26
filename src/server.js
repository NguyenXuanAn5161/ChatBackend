import bodyParser from "body-parser";
import express from "express";
// import connection from "./config/connectDB";
import { Server } from "socket.io";
import configCors from "./config/cors";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routes/api";
import initWebRoutes from "./routes/web";

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;

// config Cors
configCors(app);
//config view engine
configViewEngine(app);

// config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connectionDB
// connection();

// init web routes
initWebRoutes(app);
// init api routes
initApiRoutes(app);

const httpServer = app.listen(PORT, () => {
  console.log("Server is running on port = " + PORT);
});

// Khởi tạo socket.io với server HTTP đã được tạo bởi Express
const io = new Server(httpServer);

// Xử lý các sự kiện websocket
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});
