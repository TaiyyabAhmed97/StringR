import redis from "redis";
import connect from "../src/db";
import express from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import userRoutes from "../src/resources/user/user.router";
import stringJobRoutes from "../src/resources/stringjob/stringjob.router";
import shopRoutes from "../src/resources/shop/shop.router"

/**
 * @initialize redis client

    #TODO: use redis when needed for caching

let client = redis.createClient()
client.on('connect', () => {
    console.log(' Redis client connected')
})
client.on('error', (err) => {
    console.log(' Redis client  not connected')
})
 */
// init express server and mongo server
const PORT = 8000;
const app = express();
app.use(json());
app.use(cors());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use("/api", userRoutes);
app.use("/api", stringJobRoutes);
app.use("/api", shopRoutes);
//app.use(express.static(path.join(__dirname, "../../frontend/build")));
connect()
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on PORT:${PORT}`);
    });
  })
  .catch((e) => console.error(e));
