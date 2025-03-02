import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();

const db = new sqlite.Database('data.db', (err) => {
    if (err) {
        console.log('Erreur lors de l\'ouverture de la base de données :', err.message);
        return;
    }
    console.log('Connecté à la base de données SQLite.');

   

    const createTableUsers = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            role TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `;

    const createTableProjecteur = `
        CREATE TABLE IF NOT EXISTS projecteur (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            marque TEXT NOT NULL,
            couleur TEXT NOT NULL,
            quantite INTEGER NOT NULL
        )
    `;
    const createTableReservation = `
        CREATE TABLE IF NOT EXISTS reservation (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            projecteur_id TEXT NOT NULL,
            date_retrait TEXT NOT NULL,
            date_depot TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (projecteur_id) REFERENCES projecteur(id)
        )
    `;

    db.run(createTableUsers, (err) => {
        if (err) {
            console.log('Erreur lors de la création de la table "users" :', err.message);
        } else {
            console.log('Table "users" créée avec succès.');
        }
    });

    

    db.run(createTableProjecteur, (err) => {
        if (err) {
            console.log('Erreur lors de la création de la table "projecteur" :', err.message);
        } else {
            console.log('Table "projecteur" créée avec succès.');
        }
    });

    db.run(createTableReservation, (err) => {
        if (err) {
            console.log('Erreur lors de la création de la table "reservation" :', err.message);
        } else {
            console.log('Table "Action" créée avec succès.');
        }
    });
});

export default db;