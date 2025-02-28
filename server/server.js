import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import db from "./config/database.js"; // Your SQLite3 database connection
import user from "./controller/user.js";
import projecteur from "./controller/projecteur.js";
import action from "./controller/action.js";


const app = express();
const Port = 8082;

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET"],
        credentials: true,
    })
);
app.use(cookieParser());







app.listen(Port, (error) => {
    if (!error) {
        console.log(`Server bien demarré sur le port: http://localhost:${Port}`);
    } else {
        console.log(error);
    }
});