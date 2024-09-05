const express = require('express');

// Importer le pool de connexion à la database depuis db.js
const pool = require('./db');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Il n'y rien ici !");
});

router.get("/:id", (req, res) => {
    id = req.params.id;

    sql = `select title, content, created_at, updated_at from posts where id=${id}`;
    pool.query(sql)
        .then(rows => {
        // On transforme la réponse sql en format json et on la renvoie comme réponse à la requête de l'user
            res.json(rows);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send('Erreur du serveur');
        });
});

// On exporte le module pour l'utiliser à index.js
module.exports = router;