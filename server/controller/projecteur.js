import db from "../config/database.js"; 


class Projecteur{


    add(req, res){
        const sql = "INSERT INTO projecteur (marque, couleur, quantite) VALUES (?, ?, ?)";
        const values = [req.body.marque, req.body.couleur, req.body.quantite];
        db.run(sql, values, (err)=>{
            console.log(values);
            if (err) return res.json({Error: "Erreur lors de l'insertion"});
            return res.json({Status: "Succes"})
        })
    }

    getAll(req, res){
        const sql ="SELECT * FROM projecteur WHERE quantite >= 1";
        db.all(sql, [], (error, rows)=>{
            if(error) return res.json({Status: "Erreur"});

            return res.json({ Status: "Succes", Result: rows });
        })
    }

    getOne(req, res){
        const sql = "SELECT * FROM projecteur WHERE id = ?";
        const id = req.params.id;
        db.get(sql, [id], (error, row)=>{
            if(error) return res.json({Status: "Erreur"});
            return res.json({Status: "Succes", Result: row});
        })
    }

    update(req, res){
        const sql = "UPDATE projecteur SET marque=?, couleur=?, quantite=? WHERE id=?";
        const  { marque, couleur, quantite } = req.body;
        const id = req.params.id;

        db.run(sql, [marque, couleur, quantite, id], (err)=>{
            if(err){
                return res.json({Status: res.data.Result})
            }
            return res.json({Status: "succes "})
        })

    }


    delete(req, res){
        const sql = "DELETE FROM projecteur WHERE id = ?";
        const id = req.params.id;
        db.run(sql, [id], (err)=>{
            if(err) return res.json({Status: "Erreur"});
            return res.json({Status: "Succes"})
        })
    }
}

const projecteur = new Projecteur;


export default projecteur;