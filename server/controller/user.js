import db from "../config/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const salt = 10;
const jwtSecret = process.env.JWT_SECRET || "jwt-secret-key"; // Utiliser une variable d'environnement

class Users {
    getAll(req, res) {
        const sql = "SELECT id, name, email, role FROM users"; // Utilisation de la table users
        
        db.all(sql, [], (error, rows) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ Status: "Error", Error: "Erreur serveur." });
            }
            return res.json({ Status: "Succes", Result: rows });
        });
    }

    getOne(req, res) {
        const sql = "SELECT id, name, email, role FROM users WHERE id = ?"; // Utilisation de la table users
        const id = req.params.id;

        db.get(sql, [id], (error, row) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ Status: "Error", Error: "Erreur serveur." });
            }
            return res.json({ Status: "Succes", Result: row });
        });
    }

    register(req, res) {
        const sql = "INSERT INTO users (name, email, role, password) VALUES (?, ?, ?, ?)"; // Utilisation de la table users
        const { name, email, role, password } = req.body;

        bcrypt.hash(password.toString(), salt, (err, hash) => {
            if (err) {
                console.error("Hashing error:", err);
                return res.status(500).json({ Status: "Error", Error: "Erreur serveur." });
            }

            const values = [name, email, role, hash];

            db.run(sql, values, (err) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ Status: "Error", Error: "Erreur serveur." });
                }
                return res.json({ Status: "Succes" });
            });
        });
    }

    
    login(req, res) {
        const sql = "SELECT * FROM users WHERE email = ?"; // Utilisation de la table users
        const { email, password } = req.body;

        db.get(sql, [email], (err, row) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ Status: "Error", Error: "Erreur serveur." });
            }

            if (row) {
                bcrypt.compare(password.toString(), row.password, (err, response) => {
                    if (err) {
                        console.error("Comparison error:", err);
                        return res.status(500).json({ Status: "Error", Error: "Erreur serveur." });
                    }

                    if (response) {
                        const name = row.nom;
                        const token = jwt.sign({ name }, jwtSecret, { expiresIn: "1d" });
                        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" }); // Utiliser httpOnly et secure
                        return res.json({ Status: "Succes" });
                    } else {
                        return res.status(401).json({ Status: "Error", Error: "Mot de passe incorrect" });
                    }
                });
            } else {
                return res.status(404).json({ Status: "Error", Error: "Utilisateur non trouvé" });
            }
        });
    }

    update(req, res){
        const sql = "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?"; // Utilisation de la table users
        const { name, email, role } = req.body;
        const id = req.params.id;

        db.run(sql, [name, email, role, id], (err) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ Status: "Error", Error: "Erreur serveur." });
            }
            return res.json({ Status: "Succes" });
    }
)}

    delete(req, res) {
        const sql = "DELETE FROM users WHERE id = ?"; // Utilisation de la table users
        const id = req.params.id;

        db.run(sql, [id], (err) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ Status: "Error", Error: "Erreur serveur." });
            }
            return res.json({ Status: "Succes" });
        });
    }


}

const user = new Users();

export default user;