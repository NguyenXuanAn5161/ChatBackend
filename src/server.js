// import bodyParser from "body-parser";
// import express from "express";
// // import connection from "./config/connectDB";
// import { Server } from "socket.io";
// import configCors from "./config/cors";
// import configViewEngine from "./config/viewEngine";
// import initApiRoutes from "./routes/api";
// import initWebRoutes from "./routes/web";

// require("dotenv").config();
// const app = express();
// const PORT = process.env.PORT || 8080;

// // config Cors
// configCors(app);
// //config view engine
// configViewEngine(app);

// // config body-parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // test connectionDB
// // connection();

// // init web routes
// initWebRoutes(app);
// // init api routes
// initApiRoutes(app);

// const httpServer = app.listen(PORT, () => {
//   console.log("Server is running on port = " + PORT);
// });

// // Khởi tạo socket.io với server HTTP đã được tạo bởi Express
// const io = new Server(httpServer);

// // Xử lý các sự kiện websocket
// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     console.log("message: " + msg);
//     io.emit("chat message", msg);
//   });
// });

// import bodyParser from "body-parser";
// import express from "express";
// // import connection from "./config/connectDB";
// import { createServer } from "http";
// import { join } from "path";
// import { Server } from "socket.io";
// import configCors from "./config/cors";
// import configViewEngine from "./config/viewEngine";

// require("dotenv").config();
// const app = express();
// const PORT = process.env.PORT || 8080;
// const server = createServer(app);
// const io = new Server(server);

// // config Cors
// configCors(app);
// //config view engine
// configViewEngine(app);

// // config body-parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.sendFile(join(__dirname, "index.html"));
// });

// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });
// });

// server.listen(PORT, () => {
//   console.log("Server is running on port = " + PORT);
// });

import bodyParser from "body-parser";
import express from "express";
import http from "http"; // Sử dụng module http thay vì createServer từ "node:http"
import { Server } from "socket.io";
import configCors from "./config/cors";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routes/api";
import initWebRoutes from "./routes/web";

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app); // Tạo server HTTP từ Express app
const io = new Server(server);

// Config Cors
configCors(app);
// Config view engine
configViewEngine(app);

// Config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Init web routes
initWebRoutes(app);
// Init api routes
initApiRoutes(app);

// Gửi tệp index.html khi truy cập /
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Xử lý sự kiện khi có kết nối websocket
io.on("connection", (socket) => {
  console.log("A user connected");

  // Xử lý sự kiện khi nhận được tin nhắn từ client
  socket.on("chat message", (msg) => {
    console.log("Message: " + msg);
    // Gửi tin nhắn đã nhận được tới tất cả các client
    io.emit("chat message", msg);
  });
});

// Khởi động server HTTP
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
