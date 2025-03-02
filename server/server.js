import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import db from "./config/database.js"; // Your SQLite3 database connection
import user from "./controller/user.js";
import projecteur from "./controller/projecteur.js";
import reservation from "./controller/reservation.js";


const app = express();
const Port = 8081;

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "Vous n'êtes pas autorisé" });
    } else {
        jwt.verify(token, "jwt-secret-key", (error, decoded) => {
            if (error) {
                return res.json({ Error: "Le token n'est pas correct" });
            } else {
                req.name = decoded.name;
                next();
            }
        });
    }
};

const isAdmin = (req, res, next) => {
    const user = req.user;
    if (user.role !== "admin") {
        return res.status(403).json({ Error: "Vous n'êtes pas autorisé" });
    }
    next();
};

app.post("/login", (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.get(sql, [req.body.email], (err, row) => {
        if (err) return res.json({ Error: "Login error in server" });
        if (row) {
            bcrypt.compare(req.body.password.toString(), row.password, (err, response) => {
                if (err) return res.json({ Error: "Erreur lors de la comparaison" });
                if (response) {
                    const name = row.name;
                    const token = jwt.sign({ name }, "jwt-secret-key", { expiresIn: "1d" });
                    res.cookie("token", token);
                    return res.json({ Status: "Succes" });
                } else {
                    return res.json({ Error: "Mot de passe incorrect" });
                }
            });
        } else {
            return res.json({ Error: "Pas d'email" });
        }
    });
});
app.get("/", verifyUser, (req, res) => {
    return res.json({ Status: "Succes", name: req.name });
});

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({ Status: "Succes" });
});

app.post("/register", user.register);
app.get("/users", user.getAll);
app.get("/users/:id", user.getOne);
app.put("/users/:id", user.update);
app.delete("/users/:id", user.delete);

app.post("/projecteur/add", projecteur.add);
app.get("/projecteur", projecteur.getAll);
app.get("/projecteur/:id", projecteur.getOne);
app.put("/projecteur/:id", projecteur.update);
app.delete("/projecteur/:id", projecteur.delete);


app.post("/reservation/add", reservation.add);
app.get("/reservation/:id", reservation.getOne);
app.put("/reservation/:id", reservation.update);
app.get("/reservation", reservation.getAll);






app.listen(Port, (error) => {
    if (!error) {
        console.log(`Server bien demarré sur le port: http://localhost:${Port}`);
    } else {
        console.log(error);
    }
});