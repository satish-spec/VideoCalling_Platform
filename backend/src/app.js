import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";
import connectToSocket from "./controllers/socketManager.js";

import mongoose from "mongoose";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();  // createServer() is a function from Node.js's built-in HTTP module.
const server = createServer(app);    //hamne app ka instance create kiya createServer pe gaye aur waha pe hamne app fek diya

// const io = new Server(server);  
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));

// app.get("/home", (req, res) => {
//     return res.json({"hello" : "world"});
// });

app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({ limit : "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    // app.listen(8000, () => {
    //     console.log("Listening on port 8000")
    // });
    const connectionDb = await mongoose.connect("mongodb+srv://satishpandit360_db_user:Kolkata%4071@cluster0.dfndart.mongodb.net/");
    // const connectionDb = await mongoose.connect("mongodb+srv://satishpandit360_db_user:Kolkata%4071@cluster0.dfndart.mongodb.net/?appName=Cluster0");

    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
        console.log("LISTENING ON PORT 8000");
    })
}
start();





//server ko start karne ke liye ye command run kare-------
//npm run dev
//read script paragraph in package.json