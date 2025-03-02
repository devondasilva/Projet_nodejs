import db from "../config/database.js";

class Reservation {

    getAll(req, res) {
        const sql = "SELECT * FROM reservation";
        db.all(sql, [], (error, rows) => {
            if (error) {
                console.error("Error:", error);
                return res.json({ Status: "Erreur lors de la récupération des données" });
            }
            return res.json({ Status: "Succes", Result: rows });
        });
    }


    add(req, res) {
        const sql = "INSERT INTO action (user_id, projecteur_id, date_retrait, date_depot) VALUES (?, ?, ?, ?)";
        const values = [req.body.user_id, req.body.projecteur_id, req.body.date_retrait, req.body.date_depot];
        db.run(sql, values, (error) => {
            console.log("SQL:", sql);
            console.log("Values:", values);
            if (error) {
                console.error("Error:", error);
                return res.json({ Status: "Erreur lors de l'envoie des données" });
            }
            return res.json({ Status: "Succes" });
                });
    }

    getOne(req, res){
        const sql = "SELECT * FROM action WHERE id = ?";
        const id = req.params.id;
        db.get(sql, [id], (error, row)=>{
            if(error){
                console.error("Error:", error);
                return res.json({Status: "Erreur lors de la récupération des données"});
            }
            return res.json({Status: "Succes", Result: row});
        })
    }

    update(req, res){
        const sql = "UPDATE action SET date_depot= ? WHERE id = ?";
        const {date_depot} = req.body;
        const id = req.params.id;

        db.run(sql, [date_depot, id], (error)=>{
            console.log(error);
            if(error) return res.json({Status: "Erreur"});
        })


    }
}

const reservation = new Reservation();

export default reservation;
