import db from "../config/database.js";

class Action {
    add(req, res) {
        const sql = "INSERT INTO action (user_id, projecteur_id, date_retrait) VALUES (?, ?, ?)";
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

const action = new Action();

export default action;
