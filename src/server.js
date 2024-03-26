import bodyParser from "body-parser";
import express from "express";
// import connection from "./config/connectDB";
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

app.listen(PORT, () => {
  console.log("Server is running on port = " + PORT);
});
